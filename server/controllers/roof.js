import { pool } from "../config/database.js";

const getAllRoofs = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM roof');
        res.status(200).json(results)
    }
    catch(error){
        res.status(409).json({ error: error.message })
    }
}

const getRoofById = async (req, res) => {
    const roof_id = parseInt(req.params.roof_id);
    try{
        const results = await pool.query('SELECT * FROM roof WHERE id = $1', [roof_id])
        res.status(200).json(results);
    }
    catch (error){
        res.status(409).json({ error: error.message });
    }
}

export default {getAllRoofs, getRoofById};