import express from 'express'
import CarController from '../controllers/cars.js'


const router = express.Router();


// define routes to get events and locations
router.get('/', CarController.getAllCars);
router.get('/:car_id', CarController.getCarById);

router.post('/', CarController.createCar);
router.delete('/:car_id', CarController.deleteCarById);
router.patch('/:car_id', CarController.updateCarById)


export default router;
