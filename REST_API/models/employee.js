const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
  },
  middleNames: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
