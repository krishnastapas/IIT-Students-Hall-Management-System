const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {


        name: { type: String, required: [true, "Name is required"] },
        hallList: { type: Array },
        managerName: { type: String },
        email: { type: String },
        password: { type: String },
        establishedDate:{type:String},
        establishedBy:{type:String},
        perDayMeal: { type: Number },
        date_time: { type: String },


    }
);
module.exports = mongoose.model("mess", schema)
