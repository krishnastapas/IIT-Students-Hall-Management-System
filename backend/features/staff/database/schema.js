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
        email:{
            type:String,
            required:[true,"Email is required."]
        },
        password:{
            type:String,
            required:[true,"password is required."]
        },
        image:{
            type:String,
        },
        dob:{
            type:String
        },
        salary:{
            type:String,
            required:[true,"salary is required."]
        },
        salaryType:{
            type:String,
            required:[true,"Salary type is required."]
        },
        designation:{
            type:String,
            required:[true,"salary is required."]
        },
        date_of_joining:{
            type:String,
        },
        date_time: {
            type: String
        },
        
    }
);
module.exports = mongoose.model("staff", schema)
