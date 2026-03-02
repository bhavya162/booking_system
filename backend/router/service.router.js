const router = require("express").Router();
const controller = require("../controller/service.controller");
const { verifyUser, verifyAdmin } = require("../middlewear/auth.middlewear");

router.post("/", verifyUser, verifyAdmin, controller.createService);
router.put("/:id", verifyUser, verifyAdmin, controller.updateService);
router.delete("/:id", verifyUser, verifyAdmin, controller.deleteService);

router.get("/", controller.getServices);

module.exports = router;
