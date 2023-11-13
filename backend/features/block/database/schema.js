const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        hallId:{
            type:String,
            required:[true,"Hall id is required"]
        },
        name:{
            type:String,
            required: [true, "Name is Required."],
            unique : true, 
        },
        noOfFloors:{
            type:Number,
            required:[true,"No of floor is Required"]
        },
        date_time: {
            type: String
        },
        
    }
);
module.exports = mongoose.model("block", schema)
