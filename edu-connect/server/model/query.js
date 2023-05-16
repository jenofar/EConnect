import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
  query: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["resolved", "active"],
    default: "active",
  },
  department: {
    type: String,
    required: true,
  },
  replies: [
    {
      reply_id: {
        type: String,
      },
      professor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
      },
      reply: {
        type: String,
      },
      rate: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
      },
    },
  ],
  isAnonymous: {
    type: Boolean,
    default: true,
  },
});

var Query = mongoose.model("Query", querySchema);
export default Query;
