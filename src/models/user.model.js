const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { EUserStatus, EUserType } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;


const userSchema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: getEnum(EUserType)
    },
    status: {
        type: String,
        enum: getEnum(EUserStatus)
    }
});
userSchema.plugin(timestamps);

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        names: this.names,
        username: this.username,
        userType: this.userType
    }, SECRET_KEY);
};


const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = {
        username: Joi.string().required(),
        names: Joi.string().required(),
        password: Joi.string().required(),
        userType: Joi.string().valid(...getEnum(EUserType)).required()
    };
    return Joi.validate(data, schema);
};


const validateLogin = (data) => {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    };
    return Joi.validate(data, schema);
};




module.exports = {
    User, validate, validateLogin
};