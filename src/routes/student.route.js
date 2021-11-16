const express = require('express');
const router = express.Router();
const  {getAll, getById, create} = require('../controllers/student.controller');


router.get('/api/students', getAll);
router.get('/api/students/:id', getById);
router.post('/api/students', create);

module.exports = router;