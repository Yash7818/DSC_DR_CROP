import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const requestSchema = new mongoose.Schema({
  medium: {
    type: String,
    required: true,
  },
  mediumLink: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "incomplete",
    required: true,
  },
  requestedBy: {
    type: ObjectId,
    ref: "User",
  },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
