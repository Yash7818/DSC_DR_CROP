import express from "express";
import Request from "../models/requestmodel";
import { isAuth } from "../utils";
const router = express.Router();

router.post("/sendrequest", isAuth, async (req, res) => {
  try {
    const request = new Request({
      medium: req.body.medium,
      mediumLink: req.body.mediumLink,
      content: req.body.content,
      language: req.body.language,
      status: req.body.status,
      requestedBy: req.user,
    });

    const newrequest = await request.save();
    if (newrequest) {
      res.send({
        medium: newrequest.medium,
        mediumLink: newrequest.mediumLink,
        content: newrequest.content,
        language: newrequest.language,
        status: newrequest.status,
      });
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.get("/getrequest", isAuth, async (req, res) => {
  try {
    const allrequest = await Request.find({
      status: "incompleted",
    });
    console.log(allrequest);
    if (allrequest) {
      res.send(allrequest);
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.get("/getrequest/:id", isAuth, async (req, res) => {
  try {
    const reqid = req.params.id;
    const partrequest = await Request.findById({ reqid });
    if (partrequest) {
      res.send(partrequest);
    }
  } catch (e) {
    res.send(e);
  }
});

router.patch("/getrequest/:id", isAuth, async (req, res) => {
  try {
    const reqid = req.params.id;
    const partrequest = await Request.findById({ reqid });
    if (partrequest) {
      const changestatus = req.body.status;
      partrequest.status = changestatus;
      const updatedRequest = await partrequest.save();

      if (updatedRequest) {
        res.status(200).send({ updatedRequest });
      }
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.get("/userrequest", isAuth, async (req, res) => {
  try {
    const userrequest = await Request.find({
      requestedBy: req.user._id,
    });

    if (userrequest) {
      res.send(userrequest);
      console.log(userrequest);
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.get("/userrequest/:id", isAuth, async (req, res) => {
  try {
    const partrequest = await Request.find({
      _id: req.params.id,
      requestedBy: req.user._id,
    });

    if (partrequest) {
      res.send(partrequest);
      console.log(partrequest);
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.delete("/userrequest/:id", isAuth, async (req, res) => {
  try {
    const delrequest = await Request.findOneAndDelete({
      _id: req.params.id,
      requestedBy: req.user._id,
    });
    console.log(delrequest);
    if (delrequest) {
      res.send(delrequest);
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

export default router;
