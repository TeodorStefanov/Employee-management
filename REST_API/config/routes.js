const router = require("../routes/");

module.exports = (app) => {
  app.use("/api/employee", router.employee);

  app.use("*", (req, res, next) => res.send("<h1> Error 404 Not Found</h1>"));
};
