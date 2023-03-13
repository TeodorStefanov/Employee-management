const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
  },
  assignedTo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Employee",
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
