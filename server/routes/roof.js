import express from 'express'
import RoofController from '../controllers/roof.js'


const router = express.Router();

// define routes to get events and locations
router.get('/', RoofController.getAllRoofs);
router.get('/:roof_id', RoofController.getRoofById);


export default router;
