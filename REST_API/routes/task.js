const controllers = require("../controllers/");
const router = require("express").Router();

router.post("/create", controllers.task.post.create);
router.get("/tasks", controllers.task.get.getTasks);
module.exports = router;
