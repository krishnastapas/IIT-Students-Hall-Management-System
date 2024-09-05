const mongoose = require("mongoose");
const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"],
        },
        image: {
            type: String,

        },
        date_of_establish: {
            type: String
        },
        warden_incharge: {
            type: String
        },
        wardenEmail: {
            type: String
        },
        wardenPassword: {
            type: String
        },
        generalSecretory: {
            type: String
        },
        sportSecretary: {
            type: String
        },
        culuralSecretary: {
            type: String
        },
        environmentalSecretory: {
            type: String
        },
        maintainanceSecretory: {
            type: String
        },
        care_taker: {
            type: String
        },
        established_by: {
            type: String,
        },
        about: {
            type: String
        },
        gallery: {
            type: Array,
        },
        date_time: {
            type: String
        },

    }
);
module.exports = mongoose.model("hall", schema)
