import { pool } from "../config/database.js";

const getAllWheels = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM wheels');
        res.status(200).json(results)
    }
    catch(error){
        res.status(409).json({ error: error.message })
    }
}

const getWheelsById = async (req, res) => {
    const wheels_id = parseInt(req.params.wheels_id);
    try{
        const results = await pool.query('SELECT * FROM wheels WHERE id = $1', [wheels_id])
        res.status(200).json(results);
    }
    catch (error){
        res.status(409).json({ error: error.message });
    }
}

export default {getAllWheels, getWheelsById};