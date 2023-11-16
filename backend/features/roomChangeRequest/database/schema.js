const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        hallId: {
            type: String,
            required: [true, "Hall id is required"]
        },
        studentId: {
            type: String,
        },
        roomId: {
            type: String,
            required: [true, "room id is required"]
        },
        status: {
            type: String,
        },
        reasonForChange: {
            type: String,
        },
        date_time_applied: {
            type: String
        },
        date_time_action: {
            type: String
        },
        isAccepted: {
            type: Boolean
        },
        comment:{
            type:String
        }

    }
);
module.exports = mongoose.model("roomChangeRequest", schema)
