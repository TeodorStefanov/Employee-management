const models = require("../models");
module.exports = {
  post: {
    create: async (req, res, next) => {
      const { title, description, assignedTo, dueDate } = req.body;
      if (title && description && assignedTo && dueDate) {
        try {
          const task = await models.task.create({
            title,
            description,
            assignedTo,
            dueDate,
          });
          await models.employee.findOneAndUpdate(
            { _id: assignedTo },
            {
              $addToSet: { assignedTasks: task._id },
            },
            { new: true }
          );

          res.status(200).send({ message: "Successfully create Task" });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
  },
  get: {
    getTasks: async (req, res, next) => {
      try {
        const tasks = await models.task.find().populate("assignedTo");
        res.status(200).send(tasks);
      } catch (err) {
        res.status(500).send(err);
      }
    },
    getTask: async (req, res, next) => {
      const taskId = req.query.id;
      if (taskId) {
        try {
          const task = await models.task
            .findById(taskId)
            .populate("assignedTo");
          res.status(200).send(task);
        } catch (err) {
          res.status(401).send({ error: "There is no task" });
        }
      } else {
        res.status(401).send({ error: "There is no task" });
      }
    },
  },
  put: {
    updateTask: async (req, res, next) => {
      const { id, title, description, assignedTo, dueDate } = req.body;
      const data = req.body;
      console.log(data);
      if (title && description && dueDate) {
        try {
          const oldTask = await models.task
            .findOne({ _id: id })
            .populate("assignedTo");
          const task = await models.task.findOneAndUpdate(
            { _id: id },
            {
              title,
              description,
              assignedTo,
              dueDate,
            },
            { new: true }
          );
          if (oldTask.assignedTo._id !== assignedTo) {
            console.log(1);
            await models.employee.findOneAndUpdate(
              { _id: oldTask.assignedTo._id },
              { $pull: { assignedTasks: { $in: id } } }
            );
            await models.employee.findOneAndUpdate(
              { _id: assignedTo },
              {
                $addToSet: { assignedTasks: task._id },
              },
              { new: true }
            );
          }

          res.status(200).send({ message: "Successfully update Task" });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
    completedTask: async (req, res, next) => {
      const { taskId, employeeId } = req.body;
      if ((taskId, employeeId)) {
        try {
          const date = new Date();
          await models.task.findOneAndUpdate(
            { _id: taskId },
            { completed: true, completedDate: date }
          );
          await models.employee.findOneAndUpdate(
            { _id: employeeId },
            {
              $pull: { assignedTasks: { $in: taskId } },
              $push: { completedTasks: date },
            },
            { new: true }
          );

          res.status(200).send({ message: "Successfully complete Task" });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
  },
  delete: {
    deleteTask: async (req, res, next) => {
      const { taskId, employeeId } = req.body;
      if ((taskId, employeeId)) {
        try {
          await models.task.deleteOne({ _id: taskId });
          await models.employee.findOneAndUpdate(
            { _id: employeeId },
            {
              $pull: { assignedTasks: { $in: taskId } },
            },
            { new: true }
          );

          res.status(200).send({ message: "Successfully delete Task" });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
  },
};
