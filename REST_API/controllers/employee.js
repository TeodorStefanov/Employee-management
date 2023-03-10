const models = require("../models");
module.exports = {
  get: {
    getEmployees: async (req, res, next) => {
      try {
        const users = await models.employee.find();

        const usersNames = users.map((el) => {
          return {
            fullname: `${el.firstName} ${el.middleNames && el.middleNames} ${
              el.lastName
            }`,
            id: el.id,
          };
        });

        res.status(200).send(usersNames);
      } catch (err) {
        res.status(500).send({ error: "There is an error" });
      }
    },
    getAllEmployees: async (req, res, next) => {
      try {
        const employees = await models.employee.find();
        res.status(200).send(employees);
      } catch (err) {
        res.status(500).send({ error: "There is an error" });
      }
    },
    getEmployee: async (req, res, next) => {
      const employeeId = req.query.id;
      if (employeeId) {
        try {
          const employee = await models.employee
            .findById(employeeId)
            .populate("assignedTasks");
          res.status(200).send(employee);
        } catch (err) {
          res.status(401).send({ error: "Please enter valid Employee" });
        }
      } else {
        res.status(401).send({ error: "Please enter valid Employee" });
      }
    },
    getStatistic: async (req, res, next) => {
      try {
        const date = new Date();
        const monthNow = date.getMonth();
        const yearNow = date.getFullYear();

        const employees = (await models.employee.find())
          .map((el) => {
            el.completedTasks = el.completedTasks.filter((le) => {
              let month = le.getMonth();
              let year = le.getFullYear();

              return monthNow - 1 === month && yearNow === year;
            });
            return el;
          })
          .sort((a, b) => b.completedTasks.length - a.completedTasks.length)
          .filter((je) => {
            return je.completedTasks.length > 0;
          })
          .slice(0, 5);
        const employee = (await models.employee.find())
          .filter((el) => {
            return el.completedTasks.length > 0;
          })
          .sort((a, b) => b.completedTasks.length - a.completedTasks.length)
          .slice(0, 1);

        res.status(200).send({ employees, employee });
      } catch (err) {
        res.status(500).send(err);
      }
    },
    topEmployee: async (req, res, next) => {
      try {
        res.status(200).send(employee);
      } catch {
        res.status(500).send(err);
      }
    },
  },
  post: {
    create: async (req, res, next) => {
      const {
        firstName,
        middleNames,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        monthlySalary,
      } = req.body;
      if (
        firstName &&
        lastName &&
        email &&
        phoneNumber &&
        dateOfBirth &&
        monthlySalary
      ) {
        try {
          const user = await models.employee.create({
            firstName,
            lastName,
            middleNames,
            email,
            phoneNumber,
            dateOfBirth,
            monthlySalary,
          });

          res.status(200).send({ message: "Successfully create Employee" });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
  },
  put: {
    updateEmployee: async (req, res, next) => {
      const {
        id,
        firstName,
        middleNames,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        monthlySalary,
      } = req.body;
      if (
        id &&
        firstName &&
        lastName &&
        email &&
        phoneNumber &&
        dateOfBirth &&
        monthlySalary
      ) {
        try {
          const user = await models.employee.findOneAndUpdate(
            { _id: id },
            {
              firstName,
              lastName,
              middleNames,
              email,
              phoneNumber,
              dateOfBirth,
              monthlySalary,
            },
            { new: true }
          );

          res.status(200).send({ message: "Successfully update Employee" });
        } catch (err) {
          res.status(500).send(err);
        }
      } else {
        res.status(401).send({ error: "Please enter valid credentials" });
      }
    },
  },
  delete: {
    deleteEmployee: async (req, res, next) => {
      const { employeeId } = req.body;
      if (employeeId) {
        try {
          await models.employee.deleteOne({ _id: employeeId });
          await models.task.updateMany(
            { assignedTo: employeeId },
            { assignedTo: null }
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
