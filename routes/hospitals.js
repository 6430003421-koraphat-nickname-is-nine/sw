const express = require('express');
const {getHospitals , getHospital , createHospital , updateHospital , deleteHospital ,getVacCenters} = require('../controllers/hospital');

// Include other resource routers
const appointmentRouter = require("./appointments");

const router = express.Router();

const {protect , authorize} = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:hospitalId/appointments/' , appointmentRouter);
router.route('/vacCenters').get(getVacCenters);

router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect , authorize('admin'), updateHospital).delete(protect,authorize('admin'), deleteHospital);

module.exports = router;

/** 
* @swagger
* components:
*   schemas:
*     Hospital:
*       type: object 
*       required:
*         - name
*         - address
*       properties:
*         id:
*           type: string
*           format: uuid
*           description: The auto-generated id of the hospital
*           example: d29of1ee-6c54-4b01-90e6-d071748f0851
*         ลำดับ:
*           type: string
*           description: Oridnal number
*         name:
*           type: string
*           description: Hospital Name
*         address:
*           type: string
*           description: House No., Street, Road
*         district:
*           type: string
*           description: District
*         province:
*           type: string
*           description: Province
*         postalcode:
*           type: string
*           description: 5-digit postal code
*         tel:
*           type: string
*           description: telephone number
*         region:
*           type: string
*           description: Province
*       example:
*         id: 609bda561452242d88d36e37
*         ลำดับ: 121
*         name: Happy Hospital
*         address: 121 ถ.สุขุมวิท
*         district: บางนา
*         province: กรุงเทพมหานคร
*         postalcode: 10110
*         tel: 02-218700
*         region: กรุงเทพมหานคร (Bangkok)
*/

/** 
* @swagger
* tags:
*   name: Hospitals
*   description: The hospitals managing API
* /hospitals: 
*   get:
*     summary: Returns the list of all the hospitals
*     tags: [Hospitals]
*     responses:
*       200:
*         description: The list of all the hospitals
*         content:
*           application/json:
*             schema:
*             type: array
*             items:
*               $ref: '#/components/schemas/Hospital'
*   post:
*     summary: Create a new hospital
*     tags: [Hospitals]
*     requestBody:
*       required: true
*       content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'
*     responses:
*       201:
*         description: The hospital was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'      
*       500:
*         description: Some server error
*
*
* /hospitals/{id}: 
*   get:
*     summary: Get the hospital by id
*     tags: [Hospitals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: the hospital id
*     responses:
*       200:
*         description: The hospital description by id
*         content:
*           application/json:
*             schema:
*             type: array
*             items:
*               $ref: '#/components/schemas/Hospital'                
*       404:
*         description: The hospital was not found
*
*   put:
*     summary: Get the hospital by id
*     tags: [Hospitals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: the hospital id
*     requestBody:
*       required: true
*       content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'
*     responses:
*       200:
*         description: The hospital was updated
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Hospital'                
*       404:
*         description: The hospital was not found
*       500:
*         description: Some server error
*
*   delete:
*     summary: Remove the hospital by id
*     tags: [Hospitals]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: the hospital id
*     responses:
*       200:
*         description: The hospital was deleted        
*       404:
*         description: The hospital was not found
*
*/