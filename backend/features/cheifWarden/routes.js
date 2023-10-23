const express = require("express");
const {  chiefWardenLogin, chiefWardenLoggout, postChiefWarden } = require("./controllers");


const router = express.Router();

router.post("/chief-warden/login",chiefWardenLogin )
router.post("/chief-warden/logout",chiefWardenLoggout )
// router.post("/chief-warden",postChiefWarden);



module.exports = router;