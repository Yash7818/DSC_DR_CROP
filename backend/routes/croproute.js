import express from "express";
import Crop from "../models/cropmodel";
import { isAuth } from "../utils";
const router = express.Router();

router.post("/cropdetail", isAuth, async (req, res) => {
  try {
    const crop = new Crop({
      imgLink: req.body.imgLink,
      diseaseName: req.body.diseaseName,
      solution: req.body.solution,
      postedBy: req.user,
    });

    const newcrop = await crop.save();
    if (newcrop) {
      res.send({
        _id: newcrop._id,
        imgLink: newcrop.imgLink,
        diseaseName: newcrop.diseaseName,
        solution: newcrop.solution,
        postedBy: newcrop.user,
      });
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.get("/cropdetail", isAuth, async (req, res) => {
  try {
    const id = req.user._id;
    //console.log(id);
    const allcrop = await Crop.find({
      postedBy: id,
    }).populate("postedBy", "_id imgLink diseaseName solution");
    //console.log(allcrop);

    // Remember allcrop is an array !!

    if (allcrop) {
      res.send(allcrop);
    }
    // allcrop.forEach((element) => {
    //   console.log(element);
    // });
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.get("/cropdetail/:id", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const specificCrop = await Crop.find({
      _id: id,
      postedBy: userId,
    });

    if (specificCrop) {
      res.send(specificCrop);
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});

router.delete("/cropdetail/:id", isAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    const delcrop = await Crop.findOneAndDelete({
      _id: id,
      postedBy: userId,
    });

    if (delcrop) {
      res.send(delcrop);
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
});
export default router;
