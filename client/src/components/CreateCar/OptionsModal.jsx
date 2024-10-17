import { useEffect, useState } from "react";
import ItemDisplay from "./ItemDisplay.jsx";
import ItemAPI from "../../services/ItemAPI";
import "../../css/CreateCar.css";

const OptionsModal = ({
  itemType,
  updateCustomization,
  isModalOpen,
  onModalClose,
  selectedId,
  is_convertible,
}) => {
  const [allItems, setAllItems] = useState([]);
  const [customization, setCustomization] = useState();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(selectedId || null);
  const [isConvertible, setIsConvertible] = useState(is_convertible);

  const fetchAllItems = async (itemType) => {
    try {
      const items = await ItemAPI.getAllItems(itemType);
      console.log(items.rows);
      setAllItems(items.rows || []);
    } catch (err) {
      console.error(`Unable to fetch ${itemType} items`);
    }
  };

  useEffect(() => {
    if (isModalOpen && itemType !== null) {
      fetchAllItems(itemType);
    }
  }, [itemType, isModalOpen]);

  const handleClick = (itemId, itemPrice, convertible_only) => {
    if (convertible_only && !isConvertible) {
      alert("Cannot select this option on a coupe");
      return;
    }
    updateCustomization(itemType, itemId, itemPrice);
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="customization-grid">
          {allItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
              onClick={() =>
                handleClick(item.id, item.price, item?.convertible_only)
              }
            >
              <ItemDisplay
                key={item.id} // Add a unique key for each item
                image={item.url}
                description={item.description}
                price={item.price}
                isHovered={hoveredItemId === item.id}
                isSelected={selectedId === item.id}
                convertible_only={item?.convertible_only}
              />
            </div>
          ))}
        </div>
        <button
          className="close-modal-btn"
          onClick={(event) => {
            event.preventDefault();
            onModalClose();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default OptionsModal;
