import axios from "axios";
import Config from "../components/config/index";

export const addInventory = async (
  email = "",
  product_name = "",
  product_code = "",
  product_picture = "",
  product_of_name = "",
  product_of_id = "",
  quantity = 0,
  damage_quantity = 0
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/inventory`;
    const result = await axios.post(
      url,
      {
        email,
        product_name,
        product_code,
        product_picture,
        product_of_id,
        product_of_name,
        quantity,
        damage_quantity,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllInventoryPaginate = async (
  email = "",
  page_size = "",
  page_number = "",
  product_of_id = "",
  product_name = ""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/inventory/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&product_of_id=${product_of_id}&product_name=${product_name}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
export const getAllInventoryReport = async (
  email = "",
  product_of_id = "",
  product_name = ""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/inventory/report?email=${email}&product_of_id=${product_of_id}&product_name=${product_name}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllInventory = async (email = "", product_of_id = "") => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/inventory?email=${email}&product_of_id=${product_of_id}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const updateInventoryQuantity = async (
  email = "",
  _id = "",
  quantity = 0,
  damage_quantity
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/inventory/update-quantity`;
    const result = await axios.put(
      url,
      {
        email,
        _id,
        quantity,
        damage_quantity,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteInventory = async (email = "", _id = "") => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/inventory/delete?email=${email}&_id=${_id}`;
    const result = await axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
