const getAllItems = async (item_type) => {
  try {
    const response = await fetch(`/api/${item_type}`);
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error getting all items of type ${item_type}: `, err);
    throw err;
  }
};

const getItemById = async (item_type, item_id) => {
  try {
    const response = await fetch(`/api/${item_type}/${item_id}`);
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error getting ${item_type} item ${item_id}`, err);
    throw err;
  }
};

export default { getAllItems, getItemById };
