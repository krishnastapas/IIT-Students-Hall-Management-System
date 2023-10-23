const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        
        date_time: {
            type: String
        },
        
    }
);
module.exports = mongoose.model("student", schema)
