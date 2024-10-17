import { pool } from "../config/database.js";

const getAllInteriors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM interior');
        res.status(200).json(results)
    }
    catch(error){
        res.status(409).json({ error: error.message })
    }
}

const getInteriorById = async (req, res) => {
    const interior_id = parseInt(req.params.interior_id);
    try{
        const results = await pool.query('SELECT * FROM interior WHERE id = $1', [interior_id])
        res.status(200).json(results);
    }
    catch (error){
        res.status(409).json({ error: error.message });
    }
}

export default {getAllInteriors, getInteriorById};