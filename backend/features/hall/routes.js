const express = require("express");
const { getAllHall, deleteHall, postAddHall, postEditHall, getHall } = require("./controller");
const FileHandler = require("../action/fileupload");

const router = express.Router();
const uploadDestination = 'uploads/hall-image'; 
const fileHandler = new FileHandler(uploadDestination);

router.post("/hall-add",fileHandler.uploadFile.bind(fileHandler),postAddHall)
router.post("/hall-edit",fileHandler.uploadFile.bind(fileHandler),postEditHall)
router.get("/hall-list", getAllHall)
router.get("/hall/:id", getHall)
router.delete("/hall/:id",deleteHall)
// router.put("/hall",putHall)


module.exports = router;