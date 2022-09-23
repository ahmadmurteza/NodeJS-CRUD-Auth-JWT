const ReflectionsController = require("./../controllers/ReflectionsController");

const router = require("express").Router();

router.get("/", ReflectionsController.getAll);

router.post("/", ReflectionsController.create);

router.put("/:id", ReflectionsController.update);

router.delete("/:id", ReflectionsController.delete);

module.exports = router;
