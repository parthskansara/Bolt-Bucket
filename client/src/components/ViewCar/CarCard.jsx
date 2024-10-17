import { useEffect, useState } from "react";
import ItemAPI from "../../services/ItemAPI";
import "../../css/ViewCar.css";
import CarsAPI from "../../services/CarsAPI";

const CarCard = ({
  car_id,
  name,
  exterior_id,
  interior_id,
  roof_id,
  wheels_id,
  convertible,
}) => {
  const [exterior, setExterior] = useState("");
  const [interior, setInterior] = useState("");
  const [roof, setRoof] = useState("");
  const [wheels, setWheels] = useState("");
  const [totalPrice, setTotalPrice] = useState(65000);
  const [car, setCar] = useState({});

  const fetchCarById = async (car_id) => {
    const car = await CarsAPI.getCarById(car_id);
    console.log(car);
    setCar(car);
  };

  const computePrice = (car) => {
    let price = 65000;
    price += car?.exterior?.price || 0;
    price += car?.interior?.price || 0;
    price += car?.roof?.price || 0;
    price += car?.wheels?.price || 0;
    price = car?.convertible ? price + 10000 : price;
    setTotalPrice(price);
  };

  useEffect(() => {
    fetchCarById(car_id);
  }, []);

  useEffect(() => {
    const exterior = car?.exterior?.description || "";
    const interior = car?.interior?.description || "";
    const roof = car?.roof?.description || "";
    const wheels = car?.wheels?.description || "";

    setExterior(exterior);
    setInterior(interior);
    setRoof(roof);
    setWheels(wheels);
  }, [car]);

  useEffect(() => {
    computePrice(car);
  }, [exterior, interior, roof, wheels]);

  // const getExterior = async () => {
  //   try {
  //     const response = (await ItemAPI.getItemById("exterior", exterior_id))
  //       .rows?.[0];

  //     setTotalPrice((prevPrice) => prevPrice + response?.price);
  //     const result = response?.description;
  //     setExterior(result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const getInterior = async () => {
  //   const response = (await ItemAPI.getItemById("interior", interior_id))
  //     .rows?.[0];
  //   setTotalPrice((prevPrice) => prevPrice + response?.price);
  //   const result = response?.description;
  //   setInterior(result);
  // };

  // const getRoof = async () => {
  //   const response = (await ItemAPI.getItemById("roof", roof_id)).rows?.[0];
  //   setTotalPrice((prevPrice) => prevPrice + response?.price);
  //   const result = response?.description;
  //   setRoof(result);
  // };

  // const getWheels = async () => {
  //   const response = (await ItemAPI.getItemById("wheels", wheels_id)).rows?.[0];
  //   setTotalPrice((prevPrice) => prevPrice + response?.price);
  //   const result = response?.description;
  //   setWheels(result);
  // };

  // useEffect(() => {
  //   if (exterior_id) getExterior();
  //   if (interior_id) getInterior();
  //   if (roof_id) getRoof();
  //   if (wheels_id) getWheels();
  // }, [exterior_id, interior_id, roof_id, wheels_id]);

  return (
    <div className="card-container">
      <h3>{name}</h3>
      <div className="card-body">
        <div className="card-details">
          <p>
            <span>Exterior:</span> {exterior}
          </p>
          <p>
            <span>Wheels:</span> {wheels}
          </p>
          <p>
            <span>Roof:</span> {roof}
          </p>
          <p>
            <span>Interior:</span> {interior}
          </p>
        </div>
        <div className="card-buttons">
          <h3>💰 ${convertible ? totalPrice + 10000 : totalPrice}</h3>
          <a href={`/customcars/${car_id}`} role="button">
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
