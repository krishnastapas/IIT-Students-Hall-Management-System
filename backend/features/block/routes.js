const express = require("express");
const { postBlock, getAllBlock, deleteBlock, putBlock } = require("./controller");


const router = express.Router();

router.post("/block",postBlock)
router.get("/block-list/:hallId", getAllBlock)
router.delete("/block/:id",deleteBlock)
router.put("/block",putBlock)


module.exports = router;