const controllers = require("../controllers/");
const router = require("express").Router();

router.get("/employees", controllers.employee.get.getEmployees);
router.get("/allEmployees", controllers.employee.get.getAllEmployees);
router.get("/employee", controllers.employee.get.getEmployee);
router.get("/statistic", controllers.employee.get.getStatistic);
router.get("/topEmployee", controllers.employee.get.topEmployee);
router.post("/create", controllers.employee.post.create);
router.put("/update", controllers.employee.put.updateEmployee);
router.delete("/delete", controllers.employee.delete.deleteEmployee);
module.exports = router;
