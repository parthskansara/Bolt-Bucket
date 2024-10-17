import carsData from "../data/carsData.js";
import exteriorData from "../data/exteriorData.js";
import interiorData from "../data/interiorData.js";
import roofData from "../data/roofData.js";
import wheelsData from "../data/wheelsData.js";
import { pool } from "./database.js";

async function createCarsTable () {

    const createCarsTableQuery = `
        DROP TABLE IF EXISTS "cars";

        CREATE TABLE IF NOT EXISTS "cars" (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior_id INTEGER NOT NULL,
            roof_id INTEGER NOT NULL,
            wheels_id INTEGER NOT NULL,
            interior_id INTEGER NOT NULL,
            convertible BOOLEAN
        )
    `

    try {
        const results = await pool.query(createCarsTableQuery)
        console.log("Cars table created successfully!")
    }
    catch (err){
        console.log("Error creating cars table: ", err)
    }
}

async function createExteriorTable () {

    const createExteriorTableQuery = `
        DROP TABLE IF EXISTS "exterior";

        CREATE TABLE IF NOT EXISTS "exterior" (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            url TEXT
        )
    `

    try {
        const results = await pool.query(createExteriorTableQuery)
        console.log("Exterior table created successfully!")
    }
    catch (err){
        console.log("Error creating exterior table: ", err)
    }
}

async function createInteriorTable () {

    const createInteriorTableQuery = `
        DROP TABLE IF EXISTS "interior";

        CREATE TABLE IF NOT EXISTS "interior" (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            url TEXT,
            convertible_only BOOLEAN NOT NULL
        )
    `

    try {
        const results = await pool.query(createInteriorTableQuery)
        console.log("Interior table created successfully!")
    }
    catch (err){
        console.log("Error creating interior table: ", err)
    }
}

async function createRoofTable () {

    const createRoofTableQuery = `
        DROP TABLE IF EXISTS "roof";

        CREATE TABLE IF NOT EXISTS "roof" (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            url TEXT,
            convertible_only BOOLEAN
        )
    `

    try {
        const results = await pool.query(createRoofTableQuery)
        console.log("Roof table created successfully!")
    }
    catch (err){
        console.log("Error creating roof table: ", err)
    }
}

async function createWheelsTable () {

    const createWheelsTableQuery = `
        DROP TABLE IF EXISTS "wheels";

        CREATE TABLE IF NOT EXISTS "wheels" (
            id SERIAL PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL,
            url TEXT

        )
    `

    try {
        const results = await pool.query(createWheelsTableQuery)
        console.log("Wheels table created successfully!")
    }
    catch (err){
        console.log("Error creating wheels table: ", err)
    }
}

// -----------------------
async function seedCarsTable() {
    await createCarsTable();
    
    carsData.forEach((car, idx) => {
        const insertQuery = {            
            text: 'INSERT INTO "cars" (name, exterior_id, roof_id, wheels_id, interior_id, convertible) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            car.name,
            car.exterior_id,
            car.roof_id,
            car.wheels_id,
            car.interior_id, 
            car.convertible
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err){
                console.error("Error inserting car: ", err)
                return
            }
            console.log(`Car ${idx} added successfully`)
        })
    })
}

async function seedExteriorTable() {
    await createExteriorTable();
    
    exteriorData.forEach((item, idx) => {
        const insertQuery = {            
            text: 'INSERT INTO exterior (description, price, url) VALUES ($1, $2, $3)'
        }

        const values = [
            item.description,
            item.price,
            item.url
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err){
                console.error("Error inserting exterior item: ", err)
                return
            }
            console.log(`Exterior Item ${idx} added successfully`)
        })
    })
}

async function seedInteriorTable() {
    await createInteriorTable();
    
    interiorData.forEach((item, idx) => {
        const insertQuery = {            
            text: 'INSERT INTO interior (description, price, url, convertible_only) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            item.description,
            item.price,
            item.url,
            item.convertible_only
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err){
                console.error("Error inserting interior item: ", err)
                return
            }
            console.log(`Interior Item ${idx} added successfully`)
        })
    })
}

async function seedRoofTable() {
    await createRoofTable();
    
    roofData.forEach((item, idx) => {
        const insertQuery = {            
            text: 'INSERT INTO roof (description, price, url, convertible_only) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            item.description,
            item.price,
            item.url,
            item.convertible_only
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err){
                console.error("Error inserting roof item: ", err)
                return
            }
            console.log(`Roof Item ${idx} added successfully`)
        })
    })
}

async function seedWheelsTable() {
    await createWheelsTable();
    
    wheelsData.forEach((item, idx) => {
        const insertQuery = {            
            text: 'INSERT INTO wheels (description, price, url) VALUES ($1, $2, $3)'
        }

        const values = [
            item.description,
            item.price,
            item.url
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err){
                console.error("Error inserting wheels item: ", err)
                return
            }
            console.log(`Wheels Item ${idx} added successfully`)
        })
    })
}

async function resetDatabase () {
    await seedCarsTable();
    await seedExteriorTable();
    await seedInteriorTable();
    await seedRoofTable();
    await seedWheelsTable();
}

resetDatabase();