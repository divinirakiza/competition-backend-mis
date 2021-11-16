const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { ERROR_RESPONSE } = require('../utils/common.util');


const  AUTH_MIDDLEWARE = (req, res, next) => {
    const header = req.header('Authorization');

     if (!header) 
        return res.status(404).send(ERROR_RESPONSE(null, 'Authorisatino header not provided'));

     if (!(header.startsWith("Bearer ")))
        return res.status(404).send(ERROR_RESPONSE(null, 'Invalid Token Format'));

    const token = header.split(' ')[1];
    try {
        const decoded = jwt.verify(token);
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