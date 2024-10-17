import express from 'express'
import WheelsController from '../controllers/wheels.js'


const router = express.Router();

// define routes to get events and locations
router.get('/', WheelsController.getAllWheels);
router.get('/:wheels_id', WheelsController.getWheelsById);


export default router;
