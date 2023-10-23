const express = require("express");
const { } = require("./controllers");
const { postHall, getAllHall, deleteHall, putHall } = require("./controller");


const router = express.Router();

router.post("/hall", postHall)
router.get("/hall-all", getAllHall)
router.delete("/hall/:id",deleteHall)
router.put("/hall",putHall)


module.exports = router;