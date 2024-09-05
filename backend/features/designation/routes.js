const express = require("express");
const { } = require("./controllers");
const { postHall, getAllHall, deleteHall, putHall } = require("./controller");


const router = express.Router();

router.post("/designation", postHall)
router.get("/designation-all", getAllHall)
router.delete("/designation/:id",deleteHall)
router.put("/designation",putHall)


module.exports = router;