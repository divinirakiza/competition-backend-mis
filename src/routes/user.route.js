const express = require('express');
const router = express.Router();
const  {getAll, getById, create} = require('../controllers/user.controller');
const {AUTH_MIDDLEWARE} = require('../middlewares/auth.middleware');

router.get('/api/users', AUTH_MIDDLEWARE, getAll);
router.get('/api/users:id', getById);
router.post('/api/users', create);

module.exports = router;