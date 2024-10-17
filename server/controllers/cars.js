import { pool } from "../config/database.js";

const getAllCars = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cars");
    res.status(200).json(results);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getCarById = async (req, res) => {
  const car_id = parseInt(req.params.car_id);
  try {
    const results = await pool.query("SELECT * FROM cars WHERE id = $1", [
      car_id,
    ]);
    res.status(200).json(results);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const createCar = async (req, res) => {
  const { name, exterior_id, roof_id, wheels_id, interior_id, convertible } =
    req.body;
  try {
    const results = await pool.query(
      "INSERT INTO cars (name, exterior_id, roof_id, wheels_id, interior_id, convertible) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, exterior_id, roof_id, wheels_id, interior_id, convertible]
    );
    res.status(201).json(results);
  } catch (error) {
    console.error(error);
    res.status(409).json({ error: error.message });
  }
};

const deleteCarById = async (req, res) => {
  try {
    const car_id = parseInt(req.params.car_id);
    const results = await pool.query("DELETE FROM cars WHERE id=$1", [car_id]);
    res.status(200).json(results);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateCarById = async (req, res) => {
  try {
    const car_id = parseInt(req.params.car_id);
    const { name, exterior_id, roof_id, wheels_id, interior_id, convertible } =
      req.body;

    console.log(
      `Trying to update car with id: ${car_id} with values = name: ${name}, roof_id: ${roof_id}, wheels_id: ${wheels_id}, exterior_id: ${exterior_id}, interior_id: ${interior_id}`
    );
    const updateQuery =
      "UPDATE cars SET name = $1, exterior_id = $2, roof_id = $3, wheels_id = $4, interior_id = $5 WHERE id = $6 RETURNING *";
    const values = [name, exterior_id, roof_id, wheels_id, interior_id, car_id];
    const results = await pool.query(updateQuery, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getAllCars,
  getCarById,
  createCar,
  deleteCarById,
  updateCarById,
};
