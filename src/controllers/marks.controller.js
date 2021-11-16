const {Marks, validate} = require('../models/marks.model');
const {Student} = require('../models/student.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword, generateCalculations, generateTotalsCalculations } = require('../utils/common.util');


const POPULATOR = 'student';

const getAll = async (req, res)  => {
    try {
        const marks = await Marks.find().sort({createdAt: -1}).populate(POPULATOR);
        return res.status(200).send(SUCCESS_RESPONSE(marks));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}

const getById = async (req, res)  => {
    try {
        const marks = await Marks.findById(req.params.id);
        if (!marks) return res.status(404).send(ERROR_RESPONSE(null, 'Marks not found'));
        return res.status(200).send(SUCCESS_RESPONSE(marks));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}

const getByStudent = async (req, res)  => {
    try {
        const marks = await Marks.findOne({student: req.params.id});
        if (!marks) return res.status(404).send(ERROR_RESPONSE(null, 'Marks not found'));
        return res.status(200).send(SUCCESS_RESPONSE(marks));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}


const create = async (req, res)  => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(404).send(ERROR_RESPONSE(null, error.details[0].message));

        const inputTotalMarks = parseInt(req.body.totalMarks);
        const inputTotalFullMarks = parseInt(req.body.totalFullMarks);
        const inputAverageMarks = parseInt(req.body.averageMarks);
        const inputPercentage = parseInt(req.body.percentage);

        const totalFullMarks = generateTotalsCalculations(req.body);

        const {totalMarks, averageMarks, percentage} = generateCalculations(req.body);

        if (totalFullMarks !== inputTotalFullMarks) 
            return res.status(404).send(ERROR_RESPONSE({totalFullMarks}, 'Invalid Totals Marks Calculations'));

        if ((totalMarks !== inputTotalMarks) || (averageMarks !== inputAverageMarks) || (percentage !== inputPercentage))
            return res.status(404).send(ERROR_RESPONSE({totalMarks, averageMarks, percentage}, 'Invalid Marks Calculations'));
      
        const marks = new Marks(req.body);

        const saved = await marks.save();

        return res.status(201).send(SUCCESS_RESPONSE(saved));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}

module.exports = {
    getAll, getById, create, getByStudent
};