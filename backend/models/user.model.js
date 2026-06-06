const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const currencyConfig = require('../configs/currency.config.js');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    fullName: {
        firstName: {
            type: String,
            default: "",
            trim: true
        },
        lastName: {
            type: String,
            default: "",
            trim: true
        },
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: function () {
            return !this.isGoogleUser;
        }
    },
    phone: {
        type: String,
        default: "",
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: ""
    },
    picture: {
        type: String,
        default: ""
    },
    address: {
        city: {
            type: String,
            trim: true,
            default: ""
        },
        state: {
            type: String,
            trim: true,
            default: ""
        },
        country: {
            type: String,
            trim: true,
            default: ""
        },
    },
    role: {
        type: String,
        enum: ["user", "host", "admin"],
        default: "user"
    },
    hostProfile: {
        about: {
            type: String,
            maxlength: 500,
            default: ""
        },
        languages: [{
            type: String,
            default: ""
        }],
    },
    currency: {
        type: String,
        enum: Object.keys(currencyConfig),
        default: "INR"
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return;
        this.password = await bcrypt.hash(this.password, 12);
        
    } catch (error) {
        console.error(`Error ~ ${error}`);
        next(error);
    }
});

// Compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);