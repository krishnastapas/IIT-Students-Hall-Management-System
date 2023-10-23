const express = require("express");
const { postDestory, postLogin } = require("./controllers");


const router = express.Router();

router.post("/login",postLogin);
router.post("/login-destroy",postDestory);
router.post("/logout",postDestory)


module.exports = router;