import mongoose from "mongoose";

const professorSchema = new mongoose.Schema({
  staff_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  isProf: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

const Professor = mongoose.model("Professor", professorSchema);

export default Professor;
