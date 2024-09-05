const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {

        rollNumber: { type: String, required: true },
        courseName: { type: String, required: true },
        department: { type: String, required: true },
        admisionDate: { type: String },
        vallidDate: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String },
        phoneNumber: { type: String },
        password: { type: String, required: true },
        dob: { type: String },
        roomId: { type: String },
        blockId: { type: String, default: " " },
        hallId: { type: String, default: " " },
        messId: { type: String, default: " " },
        messRecord: { type: Array },
        hallRecord: { type: Array },
        date_time: { type: String },

    }
);
module.exports = mongoose.model("student", schema)
