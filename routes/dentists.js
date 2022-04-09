const express = require('express');
const {getDentists} = require('../controllers/dentists');
const bookingRouter = require('./booking');

const router = express.Router();

router.route('/').get(getDentists);
router.use('/:dentistId/booking/',bookingRouter);


module.exports=router;