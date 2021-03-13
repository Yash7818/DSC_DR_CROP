import mongoose from "mongoose";

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

const expertModel = mongoose.model("Expert", expertSchema);

export default expertModel;
