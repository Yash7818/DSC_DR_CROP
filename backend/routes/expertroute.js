import { OAuth2Client } from "google-auth-library";
import config from "../config/config";
import express from "express";
import Expert from "../models/expertmodel";
import { getToken, isAuth } from "../utils";
import bcrypt from "bcryptjs";
const router = express.Router();
const client = new OAuth2Client(config.CLIENT_ID);

router.post("/registerexpert", async (req, res) => {
  const inexpert = await Expert.findOne({
    email: req.body.email,
  });
  if (inexpert) {
    return new Error("User Already Exists");
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const expert = new Expert({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const newExpert = await expert.save();
    if (newExpert) {
      res.send({
        _id: newExpert._id,
        name: newExpert.name,
        email: newExpert.email,
        password: newExpert.password,
        token: getToken(newExpert),
      });
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.post("/loginexpert", async (req, res) => {
  const signinexpert = await Expert.findOne({
    email: req.body.email,
  });
  if (signinexpert) {
    const isMatch = await bcrypt.compare(
      req.body.password,
      signinexpert.password
    );
    if (isMatch) {
      res.send({
        _id: signinexpert.id,
        name: signinexpert.name,
        email: signinexpert.email,
        token: getToken(signinexpert),
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
      const googleUser = await Expert.findOne({ email });
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
        let googleUser = new Expert({
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
