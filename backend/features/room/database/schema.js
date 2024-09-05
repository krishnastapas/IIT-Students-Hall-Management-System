const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        hallId: {
            type: String,
            required: [true, "Hall id is required"]
        },
        blockId: {
            type: String,
            required: [true, "Block id required"]
        },
        name: {
            type: String,
            required: [true, "Name is Required."],
        },
        floor: {
            type: Number,
            required: [true, "Floor is Required."],

        },
        noOfBeds: {
            type: Number,
            required: [true, "No of beds required"],
            min: 1
        },
        noOfStudent: {
            type: Number,
            default: 0
        },
        studentId: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
        },
        date_time: {
            type: String
        },

    }
);
schema.index({ name: 1, hallId: 1 }, { unique: true });

module.exports = mongoose.model("room", schema)
