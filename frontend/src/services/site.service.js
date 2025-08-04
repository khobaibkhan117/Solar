import axios from "axios";
import Config from "../components/config/index";

export const addSite = async (
  email = "",
  site_name = "",
  site_description = "",
  contact_number = "",
  budget = 0,
  address = "",
  assignee = []
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/site`;
    const result = await axios.post(
      url,
      {
        email,
        site_name,
        site_description,
        contact_number,
        budget,
        address,
        assignee,
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

export const getAllSitePaginate = async (
  email = "",
  page_size = "",
  page_number = "",
  site_name = "",
  assignee = []
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/site/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&site_name=${site_name}&assignee=${assignee}`;
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

export const getAllSite = async (email = "") => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/site?email=${email}`;
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

export const updateSite = async (
  email = "",
  _id = "",
  site_name = "",
  site_description = "",
  contact_number = "",
  budget = 0,
  address = "",
  assignee = [],
  expense = []
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/site/update`;
    const result = await axios.put(
      url,
      {
        email,
        site_name,
        site_description,
        contact_number,
        budget,
        address,
        assignee,
        expense,
        _id,
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

export const addExpense = async (email = "", _id = "", expense = {}) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/site/add-expense`;
    const result = await axios.put(
      url,
      {
        email,
        _id,
        expense,
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
