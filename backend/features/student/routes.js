const express = require("express");
const { postStudent, getAllStudent, deleteStudent, putStudent } = require("./controllers");


const router = express.Router();

router.post("/student", postStudent)
router.get("/student-list", getAllStudent)
router.delete("/student/:id",deleteStudent)
router.put("/student",putStudent)


module.exports = router;