import React, { useEffect, useState } from "react";
import CarsAPI from "../services/CarsAPI";
import "../App.css";
import CarCard from "../components/ViewCar/CarCard";

const ViewCars = ({}) => {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAllCars = async () => {
    try {
      const cars = await CarsAPI.getAllCars();
      console.log(cars.rows);
      setAllCars(cars.rows || []);
      setLoading(false);
    } catch (err) {
      console.error(`Unable to fetch cars`);
      setError("Unable to fetch cars");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  useEffect(() => {
    if (allCars.length > 0)
      console.log("Logging allCars: ", allCars[0].exterior_id);
  }, [allCars]);

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="car-list">
      {allCars.map((car) => (
        <CarCard
          key={car.id}
          car_id={car.id}
          name={car.name}
          exterior_id={car.exterior_id}
          interior_id={car.interior_id}
          roof_id={car.roof_id}
          wheels_id={car.wheels_id}
          convertible={car.convertible}
        />
      ))}
    </div>
  );
};

export default ViewCars;
