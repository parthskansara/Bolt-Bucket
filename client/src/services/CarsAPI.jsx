import ItemAPI from "./ItemAPI";

const getAllCars = async () => {
  try {
    const response = await fetch("/api/cars/");
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching all cars: ", err);
    throw err;
  }
};

const getCarById = async (car_id) => {
  try {
    // Fetch car details
    const response = await fetch(`/api/cars/${car_id}`);
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const carData = (await response.json()).rows?.[0];

    if (!carData) {
      throw new Error(`Car with id ${car_id} not found`);
    }

    // Fetch related item details
    const [exterior, interior, roof, wheels] = await Promise.all([
      ItemAPI.getItemById("exterior", carData.exterior_id).then(
        (res) => res.rows?.[0]
      ),
      ItemAPI.getItemById("interior", carData.interior_id).then(
        (res) => res.rows?.[0]
      ),
      ItemAPI.getItemById("roof", carData.roof_id).then((res) => res.rows?.[0]),
      ItemAPI.getItemById("wheels", carData.wheels_id).then(
        (res) => res.rows?.[0]
      ),
    ]);

    // Aggregate data
    const completeCarData = {
      ...carData,
      exterior,
      interior,
      roof,
      wheels,
    };

    return completeCarData;
  } catch (err) {
    console.error(`Error fetching car, id = ${car_id}`, err);
    throw err;
  }
};

const createCar = async (carData) => {
  try {
    const response = await fetch(`/api/cars/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error creating car`, err);
    throw err;
  }
};

const deleteCarById = async (car_id) => {
  try {
    const response = await fetch(`/api/cars/${car_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error deleting car`, err);
    throw err;
  }
};

const updateCarById = async (car_id, carData) => {
  console.log(
    `Trying to update car with id: ${car_id} with values = ${carData}`
  );
  try {
    const response = await fetch(`/api/cars/${car_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    console.log("Getting response: ", response, response.ok);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network Error: ${response.status} - ${errorText}`);
    }
    return response;
  } catch (err) {
    console.error(`Error updating car`, err);
    throw err;
  }
};

export default {
  getAllCars,
  getCarById,
  createCar,
  deleteCarById,
  updateCarById,
};
