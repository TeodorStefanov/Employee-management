const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  familyName: {
    type: String,
    required: true,
    minLength: 1,
  },
  MiddleNames: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
  phoneNumber: {
    type: String,
    match: /^\d+$/,
    required: true,
    minLength: 3,
    maxLength: 32,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  assignedTasks: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Task",
    },
  ],
  completedTasks: [
    {
      type: Date,
    },
  ],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
