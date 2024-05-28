import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    id:{
      type:String,
      required:true,
      unique : true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    numTestCases: {
      type: Number,
      required: true,
    },
    numInputs: {
      type: Number,
      required: true,
    },
    numOutputs: {
      type: Number,
      required: true,
    },
    inputTypes: {
      type: [String],
      required: true,
    },
    outputTypes: {
      type: [String],
      required: true,
    },
    inputTestCases: {
      type: [[mongoose.Schema.Types.Mixed]],
      required: true,
    },
    outputTestCases: {
      type: [[mongoose.Schema.Types.Mixed]],
      required: true,
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
