import express from 'express'
import ExteriorController from '../controllers/exterior.js'


const router = express.Router();

// define routes to get events and locations
router.get('/', ExteriorController.getAllExteriors);
router.get('/:exterior_id', ExteriorController.getExteriorById);


export default router;
