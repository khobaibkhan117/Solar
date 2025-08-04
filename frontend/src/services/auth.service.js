import axios from "axios";
import Config from "../components/config/index";

export const signInUser = async (
  email,
  password
) => {
  try {
    const url = `${Config.baseUrl}/user?email=${email}&password=${password}`;
    const result = await axios.get(url);
    return result;
  } catch (err) {
    throw err;
  }
};


export const getAllUserPaginate = async (
  email = "",
  page_size = "",
  page_number = "",
  product_of_id = "",
  name = ""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&product_of_id=${product_of_id}&name=${name}`;
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

export const getAllUsers = async (
  email = "",
  product_of_id = ""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user/all?email=${email}&product_of_id=${product_of_id}`;
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


export const updateUserBGImage = async (
  email = "",
  bg_image = ""
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user/update-bg-image`;
    const result = await axios.put(url, {
      email,
      bg_image
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

export const updateUserStatus = async (
  email = "",
  _id = "",
  status = false
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user/update-status`;
    const result = await axios.put(url, {
      email,
      _id,
      status
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

export const userAdd = async (
  email = "",
  name = "",
  profile_picture = "",
  user_email = "",
  contact_no = "",
  features = "",
  product_of = "",
  product_of_id = "",
  password

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user`;
    const result = await axios.post(url, {
      email,
      name,
      user_email,
      profile_picture,
      contact_no,
      features,
      product_of,
      product_of_id,
      password

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


export const userUpdate = async (
  email = "",
  name = "",
  profile_picture = "",
  user_email = "",
  contact_no = "",
  features = "",
  product_of = "",
  product_of_id = "",
  _id = ""

) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user`;
    const result = await axios.put(url, {
      email,
      name,
      user_email,
      profile_picture,
      contact_no,
      features,
      product_of,
      product_of_id,
      _id

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

export const updateUserPassword = async (
  email = "",
  password = "",
  new_password = false
) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = `${Config.baseUrl}/user/update-password`;
    const result = await axios.put(url, {
      email,
      password,
      new_password
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

export const dataList = async () => {
  try {

    const url = `https://dummyjson.com/products`;
    const result = await axios.get(url);
    return result;
  } catch (err) {
    throw err;
  }

}

