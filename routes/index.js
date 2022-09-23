const router = require("express").Router();
const usersRouter = require("./users-router");
const reflectionsRouter = require("./reflections-router");
const authenticationMiddleware = require("./../middlewares/authenticationMiddleware");

router.use("/api/v1/users", usersRouter);
router.use(authenticationMiddleware);
router.use("/api/v1/reflections", reflectionsRouter);

module.exports = router;
