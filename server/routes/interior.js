import express from 'express'
import InteriorController from '../controllers/interior.js'


const router = express.Router();

// define routes to get events and locations
router.get('/', InteriorController.getAllInteriors);
router.get('/:interior_id', InteriorController.getInteriorById);


export default router;
