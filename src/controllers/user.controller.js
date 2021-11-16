const {User, validate} = require('../models/user.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/common.util');


const getAll = async (req, res)  => {
    try {
        const users  = await User.find();
        return res.status(200).send(SUCCESS_RESPONSE(users));
    }
     catch (err) {
         console.error(err);
         return res.status(500).send(ERROR_RESPONSE(null, err.toString()));
     }
}

const getById = async (req, res)  => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE(null, 'User not found'));
        return res.status(200).send(SUCCESS_RESPONSE(user));
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

    
        req.body.password = await hashPassword(req.body.password);

        const user = new User(req.body);

        const saved = await user.save();

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