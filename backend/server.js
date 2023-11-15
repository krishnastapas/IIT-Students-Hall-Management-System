const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require('fs');


//  mongodb url
const MONGODB_URL = 'mongodb://localhost:27017/IIT-HMS'



const path = require("path")
const app = express();
app.use(express.json());



app.use(cors({ origin: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});






//database
mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("database connected successfully"))
    .catch((err) => console.log("error connecting to mongodb", err));



app.use('/api/hall-images/', express.static('uploads/hall-image'));

// jwt login
app.use("/api", require("./features/jwt-login/routes"))

// login session
app.use("/api", require("./features/login_session/routes"))


// mess
app.use("/api", require("./features/mess/routes"))
// superadmin
app.use("/api", require("./features/cheifWarden/routes"))


// staff
app.use("/api", require("./features/staff/routes"))

// student
app.use("/api", require("./features/student/routes"))

// hall

app.use("/api", require("./features/hall/routes"))

// block
app.use("/api", require("./features/block/routes"));

// room 
app.use("/api", require("./features/room/routes"))


app.use(express.static(path.join(__dirname, 'dist')));



// Catch-all route to serve the main index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(5001, () => {
    console.log(`server is running on port 5001..`);

});
// module.exports = app;


