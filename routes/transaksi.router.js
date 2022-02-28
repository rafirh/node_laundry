const express = require("express");
const app = express();
const router = express.Router();
const controller = require('../controllers/transaksi.controller');
const auth = require('../auth/validation')

router.get("/", auth.checkToken ,controller.displayAllData);
router.get("/data", auth.checkToken ,controller.displayAllData2);
router.get("/:id", auth.checkToken ,controller.displayData);
router.post("/", auth.checkToken, controller.add);
// router.delete("/", auth.checkToken, controller.delete);
// router.put("/", auth.checkToken, controller.update);

module.exports = router;
