const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { EStatus } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');



const marksSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    //Totals
    totalMathMarks: {
        type: Number,
        required: true
    },
    totalEnglishMarks: {
        type: Number,
        required: true
    },
    totalSocialMarks: {
        type: Number,
        required: true
    },
    totalFrenchMarks: {
        type: Number,
        required: true
    },
    totalKinyarwandaMarks: {
        type: Number,
        required: true
    },
    totalFullMarks: {
        type: Number,
        required: true
    },
    mathMarks: {
        type: Number,
        required: true
    },
    englishMarks: {
        type: Number,
        required: true
    },
    socialMarks: {
        type: Number,
        required: true
    },
    frenchMarks: {
        type: Number,
        required: true
    },
    kinyarwandaMarks: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    averageMarks: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: getEnum(EStatus)
    }
});
marksSchema.plugin(timestamps);


const Marks = mongoose.model('Marks', marksSchema);

const validate = (data) => {
    const schema = {
        student: Joi.string().required(),
        
        totalMathMarks: Joi.number().min(0).required(),
        totalEnglishMarks: Joi.number().min(0).required(),
        totalSocialMarks: Joi.number().min(0).required(),
        totalFrenchMarks: Joi.number().min(0).required(),
        totalKinyarwandaMarks: Joi.number().min(0).required(),
        totalFullMarks: Joi.number().min(0).required(),

        mathMarks: Joi.number().min(0).required(),
        englishMarks: Joi.number().min(0).required(),
        socialMarks: Joi.number().min(0).required(),
        frenchMarks: Joi.number().min(0).required(),
        kinyarwandaMarks: Joi.number().min(0).required(),
        totalMarks: Joi.number().min(0).required(),
        averageMarks: Joi.number().min(0).required(),
        percentage: Joi.number().min(0).required()
    };
    return Joi.validate(data, schema);
};


module.exports = {
    Marks, validate
};