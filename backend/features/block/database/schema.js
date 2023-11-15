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
schema.index({ name: 1, hallId: 1 }, { unique: true });

module.exports = mongoose.model("block", schema)
