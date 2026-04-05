const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
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
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "host", "admin"],
        default: "user"
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
        console.error(`Error ~ ${error}`);
        next(error);
    }
});

// Compare passwords
userSchema.methods.comparePassword = (candidatePassword) => {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);