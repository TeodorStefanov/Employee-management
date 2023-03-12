const controllers = require("../controllers/");
const router = require("express").Router();

router.get("/employees", controllers.employee.get.getEmployees);
router.get("/employee", controllers.employee.get.getEmployee);
router.get("/statistic", controllers.employee.get.getStatistic);
router.post("/create", controllers.employee.post.create);
router.put("/update", controllers.employee.put.updateEmployee);
module.exports = router;
