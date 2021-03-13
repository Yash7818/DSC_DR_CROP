import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const cropSchema = new mongoose.Schema(
  {
    imgLink: {
      type: String,
      required: true,
      trim: true,
    },
    diseaseName: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const crop = mongoose.model("Crop", cropSchema);

export default crop;
