const {Student, validate} = require('../models/student.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/common.util');


const getAll = async (req, res)  => {
    try {
        const students  = await Student.find();
        return res.status(200).send(SUCCESS_RESPONSE(students));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}

const getById = async (req, res)  => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send(ERROR_RESPONSE(null, 'Student not found'));
        return res.status(200).send(SUCCESS_RESPONSE(student));
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

        req.body.imageUrl = `https://ui-avatars.com/api/?name=${req.body.firstName}+${req.body.lastName}`
        const student = new Student(req.body);

        const saved = await student.save();

        return res.status(201).send(SUCCESS_RESPONSE(saved));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}

module.exports = {
    getAll, getById, create
};