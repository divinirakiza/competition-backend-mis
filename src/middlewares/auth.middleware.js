const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { ERROR_RESPONSE } = require('../utils/common.util');

const SECRET_KEY = process.env.SECRET_KEY;

const  AUTH_MIDDLEWARE = async (req, res, next) => {
    const header = req.header('Authorization');

     if (!header) 
        return res.status(404).send(ERROR_RESPONSE(null, 'Authorization Headers not provided'));

     if (!(header.startsWith("Bearer ")))
        return res.status(404).send(ERROR_RESPONSE(null, 'Invalid Token Format'));

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);

        const user = await User.findById(decoded._id);

        req.AUTH_USER = user;

        next();
    }
    catch (err) {
        console.error(err);
        return res.status(404).send(ERROR_RESPONSE(null, err.toString()));
    }

}

module.exports = {AUTH_MIDDLEWARE};