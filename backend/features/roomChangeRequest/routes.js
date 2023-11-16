const express = require("express");
const { postRequestRoomChange, deleteRequestRoomChange, putRequestRoomChange, getAllRequestRoomChangeStudent, getAllRequestRoomChangeHall } = require("./controller");


const router = express.Router();

router.post("/room-change-request", postRequestRoomChange)
router.get("/hall/room-change-request-list/:id",getAllRequestRoomChangeHall)
router.get("/students/room-change-request-list/:id",getAllRequestRoomChangeStudent)
router.delete("/room-change-request/:id", deleteRequestRoomChange)
router.put("/room-change-request", putRequestRoomChange)


module.exports = router;