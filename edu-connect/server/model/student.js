import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollno: {
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
  course: {
    type: String,
    required: true,
  },
  isProf: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

let Student = mongoose.model("Student", studentSchema);

export default Student;
