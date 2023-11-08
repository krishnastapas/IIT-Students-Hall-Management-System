const express = require("express");
const { postStaff, getAllStaff, deleteStaff, putStaff } = require("./controller");


const router = express.Router();

router.post("/staff", postStaff)
router.get("/staff-list", getAllStaff)
router.delete("/staff/:id",deleteStaff)
router.put("/staff",putStaff)


module.exports = router;