const express = require("express");
const { postMess, getAllMess, deleteMess, putMess, messLogin, passwordSet } = require("./controllers");


const router = express.Router();

router.post("/mess-login", messLogin);
router.post("/mess", postMess)
router.get("/mess-list", getAllMess)
router.delete("/mess/:id", deleteMess)
router.put("/mess", putMess)
router.post("/mess-password-set", passwordSet)



module.exports = router;