import { pool } from "../config/database.js";

const getAllExteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM exterior');
        res.status(200).json(results)
    }
    catch(error){
        res.status(409).json({ error: error.message })
    }
}

const getExteriorById = async (req, res) => {
    const exterior_id = parseInt(req.params.exterior_id);
    try{
        const results = await pool.query('SELECT * FROM exterior WHERE id = $1', [exterior_id])
        res.status(200).json(results);
    }
    catch (error){
        res.status(409).json({ error: error.message });
    }
}

export default {getAllExteriors, getExteriorById};