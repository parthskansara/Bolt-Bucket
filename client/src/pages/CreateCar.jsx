import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/CreateCar.css";
import PriceTag from "../components/CreateCar/PriceTag.jsx";
import OptionsModal from "../components/CreateCar/OptionsModal.jsx";
import CarsAPI from "../services/CarsAPI";
import CustomizeCar from "../components/CustomizeCar.jsx";

const CreateCar = () => {
  const [isConvertible, setIsConvertible] = useState(false);
  const [carName, setCarName] = useState("");
  const [customizations, setCustomizations] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const handleSubmit = async (event) => {
    // create car object
    event.preventDefault();
    const carData = {
      name: carName,
      convertible: isConvertible,
      exterior_id: customizations.exterior[0] || 1,
      interior_id: customizations.interior[0] || 1,
      roof_id: customizations.roof[0] || 1,
      wheels_id: customizations.wheels[0] || 1,
    };
    console.log(carData);
    try {
      const result = await CarsAPI.createCar(carData);
      console.log(result);
      window.location.href = "/customcars";
    } catch (err) {
      console.error(err);
    }
  };

  // const updateCustomizations = (newCustomizations) => {
  //   setCustomizations(newCustomizations);
  // };

  const updateCustomizations = (category_type, item_id, item_price) => {
    setCustomizations((prevCustomizations) => ({
      ...prevCustomizations,
      [category_type]: [item_id, item_price],
    }));
  };

  const updateTotalPrice = (newPrice) => {
    setTotalPrice(newPrice);
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="categories">
          <input
            type="checkbox"
            id="convertible"
            name="convertible"
            checked={isConvertible}
            onChange={(e) => setIsConvertible(e.target.checked)}
          />
          <label htmlFor="convertible">Convertible</label>
          <CustomizeCar
            updateCustomizations={updateCustomizations}
            updateTotalPrice={updateTotalPrice}
            isConvertible={isConvertible}
          />

          <div className="car-name">
            <input
              type="text"
              className="car-name-input"
              value={carName}
              placeholder="My New Car"
              onChange={(e) => setCarName(e.target.value)}
              required
            />
            <input type="submit" value="Create" />
          </div>
        </div>
      </form>
      <div className="price-tag">
        <PriceTag price={totalPrice} />
      </div>
    </div>
  );
};

export default CreateCar;
