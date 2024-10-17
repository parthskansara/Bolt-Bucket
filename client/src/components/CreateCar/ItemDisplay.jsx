import "../../css/CreateCar.css";

const ItemDisplay = ({
  url,
  description,
  price,
  isHovered,
  isSelected,
  convertible_only = false,
}) => {
  return (
    <div className={`item-display-container ${isSelected ? "selected" : ""}`}>
      {isHovered && (
        <>
          <p>{description}</p>
          <p>$ {price}</p>
          {convertible_only && <p>For convertibles only</p>}
        </>
      )}
    </div>
  );
};

export default ItemDisplay;
