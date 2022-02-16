const express = require("express");
const router =  new express.Router();
const controller = require('../controllers/user.controller');

router.get("/", controller.displayAllData);
router.get("/:id", controller.displayData);
router.post("/", controller.add);
router.delete("/", controller.delete);
router.put("/", controller.update);

module.exports = router;