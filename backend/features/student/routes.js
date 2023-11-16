const express = require("express");
const { postStudent, getAllStudent, deleteStudent, putStudent, studentLogin, getAllStudentHallNotAlloted, getAllStudentRoomNotAlloted, allotHallStudents, allotRoomStudents, getAllStudentOfHall } = require("./controllers");


const router = express.Router();

router.post("/student", postStudent)
router.get("/student-list", getAllStudent)
router.get("/student-list/:hallId", getAllStudentOfHall)
router.delete("/student/:id",deleteStudent)
router.put("/student",putStudent)
router.post("/student-login",studentLogin)
router.get("/student-hall-not-alloted",getAllStudentHallNotAlloted);
router.get("/student-room-not-alloted/:hallId",getAllStudentRoomNotAlloted);
router.post("/student-hall-allot",allotHallStudents);
router.post("/student-room-allot",allotRoomStudents);


module.exports = router;