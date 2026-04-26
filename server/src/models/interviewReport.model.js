import mongoose from "mongoose";

/**
 * job description : String
 * resume text:String
 * self descriotion : String
 * matchScore:Number
 * technical question:[{question:"",intention:"",answer:""}]
 * behavioral question:[{question:"",intention:"",answer:""}]
 * skill gaps:[{skill:"",severity:{type:"string",enum:['low','medium','high']}}]
 * preparation plans:[{day:Number,focus:String,tasks:Array of tasks}]
 */

const technicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question Question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
  _id: false,
});

const behavioralQuestionSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "skill Question is required"],
  },
  severity: {
    type: String,
    enum: ["low", "medium,high"],
    required: [true, "Severity is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
  _id: false,
});

const skillGapsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Technical Question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
  _id: false,
});

const preparationSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: {
    type: String,
    required: [true, "Tasks is required"],
  },
  _id: false,
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description required"],
    },
    resume: {
      type: String,
    },
    matchScore: {
      type: String,
      min: 0,
      max: 100,
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestio: [behavioralQuestionSchema],
    skillGaps: [skillGapsSchema],
    prepationPlan: [preparationSchema],
  },
  { timestamps: true },
);

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

export default interviewReportModel;
