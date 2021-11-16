const express = require('express');
const router = express.Router();
const  {getAll, getById, create} = require('../controllers/user.controller');


router.get('/api/users', getAll);
router.get('/api/users:id', getById);
router.post('/api/users', create);

module.exports = router;