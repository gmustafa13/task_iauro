const mongoose = require('mongoose');
const schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

let userSchema = new schema({
    firstName: {
        type: String,
        required: [true, "user first name required"]
    },
    lastName: {
        type: String,
        required: [true, "user last name required"]
    },
    email: {
        type: String,
        required: [true, "user email required"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            }
        }
    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true
    }
})

userSchema.pre("save", async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await jwt.sign({
            password: user.password
        }, process.env.jwt_secret)
    }
    next()
})
module.exports = mongoose.model("user", userSchema);