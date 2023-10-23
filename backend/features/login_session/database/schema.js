const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,

        },
        accessToken: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        },
        date_time: {
            type: String
        },
        
    }
);
module.exports = mongoose.model("login_session", schema)
