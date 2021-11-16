const express = require('express');
const router = express.Router();
const  {getAll, getById, create, getByStudent} = require('../controllers/marks.controller');


router.get('/api/marks', getAll);
router.get('/api/marks/:id', getById);
router.get('/api/marks/student/:id', getByStudent);
router.post('/api/marks', create);

module.exports = router;