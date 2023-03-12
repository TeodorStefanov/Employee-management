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
};
