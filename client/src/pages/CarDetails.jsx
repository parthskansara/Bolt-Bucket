import React, { useEffect, useState } from "react";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import { useParams } from "react-router-dom";
import ItemDisplay from "../components/CreateCar/ItemDisplay";
import "../css/CarDetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [hoveredProperty, setHoveredProperty] = useState("");

  const computePrice = (car) => {
    let price = 65000;
    price += car?.exterior?.price || 0;
    price += car?.interior?.price || 0;
    price += car?.roof?.price || 0;
    price += car?.wheels?.price || 0;
    price = car?.convertible ? price + 10000 : price;
    setTotalPrice(price);
  };

  const fetchCarById = async (car_id) => {
    const car = await CarsAPI.getCarById(car_id);
    console.log(car);
    setCar(car);
  };

  useEffect(() => {
    computePrice(car);
  }, [car]);

  const handleDelete = async (car_id) => {
    try {
      await CarsAPI.deleteCarById(car_id);
      window.location.href = "/customcars";
    } catch (err) {
      console.error("Error deleting car", err);
    }
  };

  const handleEdit = (car_id) => {
    window.location.href = `/edit/${car_id}`;
  };

  useEffect(() => {
    fetchCarById(id);
  }, [id]);

  return (
    <div className="car-details-container">
      <h2>{car.name}</h2>
      <div className="car-details-grid">
        <div className="car-details-col1">
          <h3>{totalPrice}</h3>
          <div className="car-details-row">
            <button onClick={() => handleEdit(car.id)}>Edit</button>
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

export default CarDetails;
