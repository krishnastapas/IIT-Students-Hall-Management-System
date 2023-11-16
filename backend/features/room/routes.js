const express = require("express");
const { postRoom, getAllRoom, deleteRoom, putRoom, emptyRoomList, IsRoomEmpty } = require("./controller");


const router = express.Router();

router.post("/room",postRoom)
router.get("/room-list/:hallId/:blockId", getAllRoom)
router.delete("/room/:id",deleteRoom)
router.put("/room",putRoom)
router.get("/room-empty-list/:hallId",emptyRoomList);
router.get("/room-epmty/:id",IsRoomEmpty)


module.exports = router;