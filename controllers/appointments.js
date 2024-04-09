const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");

//@desc     Get all appointments
//@route    GET api/v1/appointments
//@access   Public

exports.getAppointments = async (req, res, next) => {
  let query;

  // General User can see only their appointments!
  if (req.user.role !== "admin") {
    console.log(req.user.name);
    query = Appointment.find({ user: req.user.id }).populate({
      path: "hospital",
      select: "name province tel",
    });
    // console.log(query)
  } else {
    // Admin can see all
    if (req.params.hospitalId) {
      let hosId = req.params.hospitalId;

      console.log(hosId);

      query = Appointment.find({ hospital: hosId }).populate({
        path: "hospital",
        select: "name province tel",
      });
    } else {
      query = Appointment.find().populate({
        path: "hospital",
        select: "name province tel",
      });
    }
  }

  try {
    const appointmentsData = await query;

    res.status(200).json({
      success: true,
      count: appointmentsData.length,
      data: appointmentsData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot find appointment",
    });
  }
};

//@desc     Get single appointment
//@route    GET api/v1/appointments/:id
//@access   Public

exports.getAppointment = async (req, res, next) => {
  try {
    let hid = req.params.id;
    const appointment = await Appointment.findById(hid).populate({
      path: "hospital",
      select: "name description tel",
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${hid}`,
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, massage: "Cannot find Appointment" });
  }
};

//@desc     Add a appointments
//@route    POST api/v1/hospitals/:hospitalId/appointment
//@access   Private

exports.addAppointment = async (req, res, next) => {
  try {
    const hid = req.params.hospitalId;

    req.body.hospital = hid;

    // Check if hospital exist
    const hospital = await Hospital.findById(hid);

    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, massage: `No hospital with the id of ${hid}` });
    }
    //add user Id to req.body
    req.body.user = req.user.id;

    const existedAppointments = await Appointment.find({ user: req.user.id });

    // console.log(existedAppointments.length);
    // If user is not an admin, they can only create 3 appointment
    if (existedAppointments.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        massage: `The user with id ${req.user.id} has already made 3 appointments`,
      });
    }

    const appointment = await Appointment.create(req.body);

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      massage: "Cannot create Appointment",
    });
  }
};

//@desc     Update a appointments
//@route    PUT api/v1/hospitals/:hospitalId/appointment
//@access   Private

exports.updateAppointment = async (req, res, next) => {
  try {
    const apptid = req.params.id;
    const user = req.user;

    //check if appointment existed

    let appointment = await Appointment.findById(apptid);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        massage: `No appointment with the id of ${apptid}`,
      });
    }
    //make sure if user is the appointment owner
    if (appointment.user.toString() !== user.id && user.role !== "admin") {
      return res.status(404).json({
        success: false,
        massage: `User ${user.id} is not authorized to update this appointment`,
      });
    }

    appointment = await Appointment.findByIdAndUpdate(apptid, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      massage: "Cannot update Appointment",
    });
  }
};

//@desc     Delete a appointments
//@route    DELETE api/v1/hospitals/:hospitalId/appointment
//@access   Private

exports.deleteAppointment = async (req, res, next) => {
  try {
    const apptid = req.params.id;
    const user = req.user;

    const appointment = await Appointment.findById(apptid);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        massage: `No appointment with the id of ${apptid}`,
      });
    }

    //make sure if user is the appointment owner
    if (appointment.user.toString() !== user.id && user.role !== "admin") {
      return res.status(404).json({
        success: false,
        massage: `User ${user.id} is not authorized to delete this bootcamp`,
      });
    }
    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      massage: "Cannot delete Appointment",
    });
  }
};
//==========================================================

//@desc     Create a appointments for testing purpose only
//@route    Post api/v1/appointments
//@access   Public

exports.createAppointment = async (req, res, next) => {
  // console.log(req.body);
  // res.status(200).json({success: true , msg:`Create new hospitals`});
  const appointment = await Appointment.create(req.body);
  res.status(201).json({ success: true, data: appointment });
};
