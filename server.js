import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./backend/config/config";
import userRoute from "./backend/routes/userRoute";
import expertRoute from "./backend/routes/expertroute";
import cropRoute from "./backend/routes/croproute";
import requestRoute from "./backend/routes/requestroute";
import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} from "./backend/userchat";
import Cors from "cors";
import socket from "socket.io";
import http from "http";
import path from "path";
const PORT = process.env.PORT || 5000;

console.log(PORT);
// path.join(__dirname, dist);

dotenv.config();
const mongodbUrl = process.env.MONGODB_URL || config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongoose Connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use(Cors());
app.use(express.static(path.join(__dirname + "../build")));
app.use("/api/users", userRoute);
app.use("/api/expert", expertRoute);
app.use("/api/crop", cropRoute);
app.use("/api/request", requestRoute);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "../build/index.html"));
});

const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

const users = {};

const socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 8) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);
    console.log(users);
    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return cb(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "Admin",
      text: `${user.name} , Welcome to the Chat`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Admin", text: `${user.name} has joined !!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    cb();
  });

  socket.on("sendMessage", (message, cb) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    cb();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left `,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server started at ${port}`);
});
