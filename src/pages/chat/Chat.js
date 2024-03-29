import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "./Input";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


import NavBar from '../../components/Navbar';
const chatStyle = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    paddingTop:"5em"
  },
  innerContainer: {
    overflow:"scroll",
    height: "100%",
    width: "100%",
  },
});

const ENDPOINT = "http://localhost:5000/";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) alert(error);
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const classes = chatStyle();

  return (
    <>
    <NavBar/>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.innerContainer}
      >
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Grid>
    </Grid>
    </>
  );
};

export default Chat;
