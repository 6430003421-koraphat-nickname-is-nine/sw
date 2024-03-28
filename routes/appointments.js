const express = require('express');

const {getAppointments , getAppointment,addAppointment,updateAppointment,deleteAppointment}  =require('../controllers/appointments');
const {createAppointment} = require('../controllers/appointments');//for testing purpose only

const router = express.Router({mergeParams:true});

const {protect , authorize} = require("../middleware/auth");

router.route('/')
    .get(protect , getAppointments)
    .post(protect, authorize('admin','user'),addAppointment);

router.route('/:id')
    .get(protect , getAppointment)
    .put(protect, authorize('admin','user') ,updateAppointment)
    .delete(protect, authorize('admin','user') ,deleteAppointment);

router.route('/').post(protect , authorize('admin') , createAppointment);//for testing purpose only

module.exports = router;