const express = require("express");
const { } = require("./controllers");
const { postStaff, getAllStaff, deleteStaff, putStaff } = require("./controller");


const router = express.Router();

router.post("/staff", postStaff)
router.get("/staff-all", getAllStaff)
router.delete("/staff/:id",deleteStaff)
router.put("/staff",putStaff)


module.exports = router;