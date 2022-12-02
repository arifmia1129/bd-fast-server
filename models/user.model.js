const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    divisionId: {
        type: String,
        trim: true,
        required: [true, "Provide a division"]
    },
    districtId: {
        type: String,
        trim: true,
        required: [true, "Provide a district"]
    },
    upazilaId: {
        type: String,
        trim: true,
        required: [true, "Provide a district"]
    },
    instituteId: {
        type: String,
        trim: true,
        required: [true, "Provide a district"]
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    nid: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 17,
        minLength: 10
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 11,
        minLength: 11
    },
    pin: {
        type: String,
        required: true,
        trim: true,
        maxLength: 8,
        minLength: 8
    },
    confirmPin: {
        type: String,
        required: true,
        trim: true,
        maxLength: 8,
        minLength: 8,
        validate: {
            validator: function (v) {
                return this.password == v;
            },
            message: "Pin and confirm pin didn't match"
        }
    },
    deviceModel: {
        type: String,
        required: true,
        trim: true
    },
    buildNumber: {
        type: String,
        required: true,
        trim: true
    },
    userType: {
        type: String,
        enum: {
            values: ["digitalCenter", "citizen", "upAssistant", "upSecretary", "villagePolice", "shopkeeper", "publicRepresentative"],
            message: "{VALUE} is not valid user type"
        }
    }
})


const User = mongoose.model("User", userSchema);

module.exports = User;