import axios from "axios";
import Config from "../components/config/index";

export const customerAdd = async (
  email = "",
  name = "",
  cnic = "",
  profile_picture = "",
  contact_no = "",

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/customer`;

    const result = await axios.post(url, {
      email,
      name,
      cnic,
      profile_picture,
      contact_no

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


export const getAllCustomerPaginate = async (
  email = "",
  page_size = "",
  page_number = "",
  name=""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/customer/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&name=${name}`;
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

export const getAllCustomer = async (
  email = "",
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/customer?email=${email}`;
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


export const customerUpdate = async (
  email = "",
  name = "",
  cnic = "",
  profile_picture = "",
  contact_no = "",
  _id=""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/customer/update`;
    const result = await axios.put(url, {
      email,
      name,
      cnic,
      profile_picture,
      contact_no,
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

export const deleteCustomer = async (
  email="",
  _id="",
 
  
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/customer/delete?email=${email}&_id=${_id}`;
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

export const getCustomerByID = async (
  email = "",
  _id=""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/customer/by-id?email=${email}&_id=${_id}`;
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



