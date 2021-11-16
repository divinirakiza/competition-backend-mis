const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { EStatus } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');


const studentSchema = mongoose.Schema({
    studentID: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: getEnum(EStatus)
    }
});
studentSchema.plugin(timestamps);


const Student = mongoose.model('Student', studentSchema);

const validate = (data) => {
    const schema = {
        studentID: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        class: Joi.string().required()
    };
    return Joi.validate(data, schema);
};


module.exports = {
    Student, validate
};