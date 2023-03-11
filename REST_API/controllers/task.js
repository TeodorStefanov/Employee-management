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
          console.log(err);
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
  },
};
