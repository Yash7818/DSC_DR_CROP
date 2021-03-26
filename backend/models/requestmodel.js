import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const requestSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
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
  },
  language: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default:false,
  },
  requestedBy: {
    type: ObjectId,
    ref: "User",
  },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
