const express = require("express");
const { postRoom, getAllRoom, deleteRoom, putRoom } = require("./controller");


const router = express.Router();

router.post("/room",postRoom)
router.get("/room-list/:hallId/:blockId", getAllRoom)
router.delete("/room/:id",deleteRoom)
router.put("/room",putRoom)


module.exports = router;