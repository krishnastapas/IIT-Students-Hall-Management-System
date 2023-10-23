const express = require("express");
const { postJwtLogin } = require("./controllers");


const router = express.Router();

router.get("/jwt-login",postJwtLogin);



module.exports = router;