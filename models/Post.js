const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
       title: {
           type: String,
           required: true,
           unique: true,
       },
       description: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        marka: {
            type: String,
            required: false,
        },
        model: {
            type: String,
            required: false,
        },
        price: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        race: {
            type: String,
            required: false,
        },
        year: {
            type: String,
            required: false,
        },
        files: {
            type: Array,
            required: false,
        },
        phone: {
            type: String,
            required: true,
        },
        regionsName: {
            type: String,
            required: false,
        },
        locationName: {
            type: String,
            required: false,
        },
        pseudonime: {
            type: String,
            required: false,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", PostSchema);