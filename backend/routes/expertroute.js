import express from "express";
import Expert from "../models/expertmodel";
import { getToken, isAuth } from "../utils";
import bcrypt from "bcryptjs";
const router = express.Router();

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

export default router;
