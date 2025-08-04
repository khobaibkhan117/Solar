import axios from "axios";
import Config from "../components/config/index";

export const saleAdd = async (
  email = "",
  sale_details = [],
  customer_name = "",
  customer_id = "",
  discount = 0,
  sub_total = 0,
  total = 0,
  customer_type = "",
  vehicle_number = "",
  details = "",
  payment_method = "",
  received_amount = 0,
  remaining_amount = 0,
  invoice_by = "",
  vehicle_person_name = "",
  address = ""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/sale`;

    const result = await axios.post(url, {
      email,
      sale_details,
      customer_name,
      customer_id,
      customer_type,
      discount,
      sub_total,
      total,
      vehicle_number,
      details,
      payment_method,
      received_amount,
      remaining_amount,
      invoice_by,
      vehicle_person_name,
      address

    }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {

    throw err;
  }
};

export const getAllSalePaginate = async (
  email = "",
  page_size = "",
  page_number = "",
  sale_id = ""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/sale/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&sale_id=${sale_id}`;
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

export const saleDelete = async (
  email = "",
  sale_id = ""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/sale/delete`;

    const result = await axios.post(url, {
      email,
      sale_id

    }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {

    throw err;
  }
};

