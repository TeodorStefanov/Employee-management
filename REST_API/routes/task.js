const controllers = require("../controllers/");
const router = require("express").Router();

router.post("/create", controllers.task.post.create);
module.exports = router;