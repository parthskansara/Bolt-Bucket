import { useEffect, useState } from "react";
import OptionsModal from "./CreateCar/OptionsModal";
import "../css/CreateCar.css";

const CustomizeCar = ({
  initialCustomizations = {},
  updateCustomizations,
  updateTotalPrice,
  isConvertible,
}) => {
  console.log("Initial Customizations: ", initialCustomizations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCustomizations, setSelectedCustomizations] = useState({
    ...initialCustomizations,
  });
  const [totalPrice, setTotalPrice] = useState(65000);
  const handleClick = (event, itemType) => {
    event.preventDefault();
    setSelectedCategory(itemType);
    console.log(selectedCustomizations);
  };

  useEffect(() => {
    if (selectedCategory !== null) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [selectedCategory]);

  // useEffect(() => {
  //   updateCustomizations(selectedCustomizations);
  // }, [selectedCustomizations, updateCustomizations]);

  useEffect(() => {
    updateTotalPrice(totalPrice);
  }, [totalPrice, updateTotalPrice]);

  const handleCustomizationChange = (category_type, item_id, item_price) => {
    setSelectedCustomizations((prevCustomizations) => ({
      ...prevCustomizations,
      [category_type]: [item_id, item_price],
    }));
    updateCustomizations(category_type, item_id, item_price);
    console.log("New customizations after edit: ", selectedCustomizations);
  };

  const onModalClose = () => {
    setSelectedCategory(null);
  };

  const recomputePrice = () => {
    // find updated prices
    let updatedPrice = 65000; // base price
    const convertibleCost = isConvertible ? 10000 : 0;
    Object.values(selectedCustomizations).forEach(([item_id, item_price]) => {
      updatedPrice += item_price || 0;
    });
    // console.log("Setting total price inside customize car to: ");
    setTotalPrice(updatedPrice + convertibleCost);
    // setTotalPrice(updatedPrice)
  };

  useEffect(() => {
    recomputePrice();
  }, [selectedCustomizations, isConvertible]);

  const category_list = [
    {
      category_type: "exterior",
      label: "Exterior",
    },
    {
      category_type: "roof",
      label: "Roof",
    },
    {
      category_type: "wheels",
      label: "Wheels",
    },
    {
      category_type: "interior",
      label: "Interior",
    },
  ];

  return (
    <>
      {category_list.map((item) => (
        <button
          key={item.category_type}
          onClick={(event) => handleClick(event, item.category_type)}
        >
          {item.label}
        </button>
      ))}
      <OptionsModal
        isModalOpen={isModalOpen}
        itemType={selectedCategory}
        updateCustomization={handleCustomizationChange}
        onModalClose={onModalClose}
        selectedId={selectedCustomizations[selectedCategory]?.[0]}
        is_convertible={isConvertible}
      />
    </>
  );
};

export default CustomizeCar;
