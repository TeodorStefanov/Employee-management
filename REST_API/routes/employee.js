const controllers = require("../controllers/");
const router = require("express").Router();

router.get("/employees", controllers.employee.get.employees);
router.post("/create", controllers.employee.post.create);
router.get("/employee", controllers.employee.get.employee);
module.exports = router;
