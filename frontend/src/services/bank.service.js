import axios from "axios";
import Config from "../components/config/index";

export const bankAdd = async (
  email = "",
  bank_name = "",
  account_title = "",
  account_no = "",

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/bank`;

    const result = await axios.post(url, {
      email,
      bank_name,
      account_title,
      account_no
    },{
      headers: {
        Authorization:token ?`Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {

    throw err;
  }
};


export const getAllBankPaginate = async (
  email = "",
  page_size = "",
  page_number = "",
  account_title=""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/bank/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&account_title=${account_title}`;
    const result = await axios.get(url,{
      headers: {
        Authorization:token ?`Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAllBank = async (
  email = "",
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/bank?email=${email}`;
    const result = await axios.get(url,{
      headers: {
        Authorization:token ?`Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};


export const bankUpdate = async (
  email = "",
  bank_name = "",
  account_title = "",
  account_no = "",
  _id=""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/bank/update`;
    const result = await axios.put(url, {
      email,
      bank_name,
      account_title,
      account_no,
      _id

    },{
      headers: {
        Authorization:token ?`Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {

    throw err;
  }
};

export const deletebank = async (
  email="",
  _id="",
 
  
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/bank/delete?email=${email}&_id=${_id}`;
    const result = await axios.delete(url,{
      headers: {
        Authorization:token ?`Bearer ${token}` : "",
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};



