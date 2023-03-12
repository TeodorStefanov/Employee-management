const controllers = require("../controllers/");
const router = require("express").Router();

router.post("/create", controllers.task.post.create);
router.get("/tasks", controllers.task.get.getTasks);
router.get("/task", controllers.task.get.getTask);
router.put("/update", controllers.task.put.updateTask);
router.put("/completed", controllers.task.put.completedTask);
router.delete("/delete", controllers.task.delete.deleteTask);
module.exports = router;
