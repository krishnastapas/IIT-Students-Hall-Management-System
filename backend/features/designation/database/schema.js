const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Name is Required"],
        },
       
        date_time: {
            type: String
        },
        
    }
);
module.exports = mongoose.model("hall", schema)
