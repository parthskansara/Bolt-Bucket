import React, { useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import CarDetails from "./CarDetails";

import "../css/CreateCar.css";
import CarsAPI from "../services/CarsAPI";
import ItemDisplay from "../components/CreateCar/ItemDisplay";
import CustomizeCar from "../components/CustomizeCar";

const EditCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [hoveredProperty, setHoveredProperty] = useState("");
  const [isConvertible, setIsConvertible] = useState(false);
  const [customizations, setCustomizations] = useState({
    exterior: [],
    interior: [],
    roof: [],
    wheels: [],
  });
  const [carName, setCarName] = useState("");
  const updateCustomizations = (category_type, item_id, item_price) => {
    setCustomizations((prevCustomizations) => ({
      ...prevCustomizations,
      [category_type]: [item_id, item_price],
    }));
  };

  const updateTotalPrice = (newPrice) => {
    console.log("Updating price to :", newPrice);
    // setTotalPrice(newPrice);
  };

  const computePrice = (car) => {
    console.log("Setting price, car = ", car);
    let price = 65000;
    price += car.exterior?.price || 0;
    price += car.interior?.price || 0;
    price += car.roof?.price || 0;
    price += car.wheels?.price || 0;
    price = car.convertible ? price + 10000 : price;
    console.log("Price is: ", price);
    setTotalPrice(price);
  };

  useEffect(() => {
    computePrice(car);
  }, [car, customizations]);

  const fetchCarById = async (car_id) => {
    const car = await CarsAPI.getCarById(car_id);
    console.log("Logging car: ", car);
    setCar(car);
    setCustomizations({
      exterior: [car.exterior_id, car.exterior?.price],
      interior: [car.interior_id, car.interior?.price],
      roof: [car.roof_id, car.roof?.price],
      wheels: [car.wheels_id, car.wheels?.price],
    });
  };

  const handleDelete = async (car_id) => {
    try {
      await CarsAPI.deleteCarById(car_id);
      window.location.href = "/customcars";
    } catch (err) {
      console.error("Error deleting car", err);
    }
  };

  const editCarById = async (car_id) => {
    console.log("Logging customizations", customizations);
    const carData = {
      name: carName,
      exterior_id: customizations.exterior[0],
      roof_id: customizations.roof[0],
      wheels_id: customizations.wheels[0],
      interior_id: customizations.interior[0],
    };
    try {
      const result = await CarsAPI.updateCarById(car_id, carData);
      console.log(result);
      window.location.href = `/customcars`;
    } catch (err) {
      console.error("Error updating value: ", err);
    }
  };

  const handleEdit = (car_id) => {
    editCarById(car_id);
  };

  useEffect(() => {
    fetchCarById(id);
  }, [id]);

  useEffect(() => {
    setIsConvertible(car.convertible);
    setCarName(car.name);
  }, [car]);

  return (
    <div className="car-details-container">
      <h2>{car.name}</h2>
      <CustomizeCar
        initialCustomizations={customizations}
        updateCustomizations={updateCustomizations}
        updateTotalPrice={updateTotalPrice}
        isConvertible={isConvertible}
      />
      <div className="car-details-grid">
        <div className="car-details-col1">
          <h3>{totalPrice}</h3>
          <div className="car-details-row">
            <button onClick={() => handleEdit(car.id)}>Update</button>
            <button onClick={() => handleDelete(car.id)}>Delete</button>
          </div>
        </div>
        <div className="car-details-col2">
          <div
            onMouseEnter={() => setHoveredProperty("exterior")}
            onMouseLeave={() => setHoveredProperty("")}
          >
            <ItemDisplay
              url={car?.exterior?.url}
              description={car?.exterior?.description}
              price={car?.exterior?.price}
              isHovered={hoveredProperty === "exterior"}
            />
          </div>
          <div
            onMouseEnter={() => setHoveredProperty("interior")}
            onMouseLeave={() => setHoveredProperty("")}
          >
            <ItemDisplay
              url={car?.interior?.url}
              description={car?.interior?.description}
              price={car?.interior?.price}
              isHovered={hoveredProperty === "interior"}
            />
          </div>

          <div
            onMouseEnter={() => setHoveredProperty("roof")}
            onMouseLeave={() => setHoveredProperty("")}
          >
            <ItemDisplay
              url={car?.roof?.url}
              description={car?.roof?.description}
              price={car?.roof?.price}
              isHovered={hoveredProperty === "roof"}
            />
          </div>

          <div
            onMouseEnter={() => setHoveredProperty("wheels")}
            onMouseLeave={() => setHoveredProperty("")}
          >
            <ItemDisplay
              url={car?.wheels?.url}
              description={car?.wheels?.description}
              price={car?.wheels?.price}
              isHovered={hoveredProperty === "wheels"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
