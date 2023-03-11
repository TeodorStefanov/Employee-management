const models = require("../models");
module.exports = {
  get: {
    employees: async (req, res, next) => {
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
    employee: async (req, res, next) => {
      const employeeId = req.query.id;
      console.log(employeeId);
      if (employeeId) {
        try {
          await models.employee.findById(employeeId);
          res.status(200).send({ message: "Employee is checked" });
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

          res.status(200).send({message: 'Successfully create Employee'});
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
