import { OAuth2Client } from "google-auth-library";
import config from "../config/config";
import express from "express";
import User from "../models/usermodel";
import { getToken, isAuth } from "../utils";
import bcrypt from "bcryptjs";
const router = express.Router();
const client = new OAuth2Client(config.CLIENT_ID);

router.post("/register", async (req, res) => {
  const inuser = await User.findOne({
    email: req.body.email,
  });
  if (inuser) {
    return new Error("User Already Exists");
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        token: getToken(newUser),
      });
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const signinuser = await User.findOne({
    email: req.body.email,
  });
  if (signinuser) {
    const isMatch = await bcrypt.compare(
      req.body.password,
      signinuser.password
    );
    if (isMatch) {
      res.send({
        _id: signinuser.id,
        name: signinuser.name,
        email: signinuser.email,
        token: getToken(signinuser),
      });
    } else {
      res.status(401).send({ error: "Invalid Credentials" });
    }
  } else {
    res.status(401).send({ error: "Invalid Credentials" });
  }
});

router.post("/googlelogin", async (req, res) => {
  const { tokenId } = req.body;
  try {
    const verifiedUser = await client.verifyIdToken({
      idToken: tokenId,
      audience: config.CLIENT_ID,
    });
    const { email_verified, name, email } = verifiedUser.payload;
    console.log(verifiedUser.payload);

    if (email_verified) {
      const googleUser = await User.findOne({ email });
      if (googleUser) {
        res.send({
          _id: googleUser.id,
          name: googleUser.name,
          email: googleUser.email,
          token: getToken(googleUser),
        });
      } else {
        let googlePassword = email + config.JWT_SECRET;
        const hashedGooglePassword = await bcrypt.hash(googlePassword, 8);
        let googleUser = new User({
          name,
          email,
          password: hashedGooglePassword,
        });

        const newUser = await googleUser.save();
        if (newUser) {
          res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            token: getToken(newUser),
          });
        }
      }
    }
  } catch (err) {
    res.send(err);
  }
});

export default router;
