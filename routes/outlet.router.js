const express = require("express");
const router =  new express.Router();
const controller = require('../controllers/outlet.controller');
const auth = require('../auth/validation');

router.get("/",auth.checkToken ,controller.displayAllData);
router.get("/:id", auth.checkToken ,controller.displayData);
router.post("/", auth.checkToken, controller.add);
router.delete("/", auth.checkToken, controller.delete);
router.put("/", auth.checkToken, controller.update);

module.exports = router;    