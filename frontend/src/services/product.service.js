import axios from "axios";
import Config from "../components/config/index";

export const addProduct = async (
    email="",
    name="",
    code="",
    company_name="",
    price="",
    cost="",
    alert="",
    picture="",
    description="",
    watt=""
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/product`;
      const result = await axios.post(url,{
        email,
        name,
        code,
        company_name,
        price,
        cost,
        alert,
        picture,
        description,
        watt

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

  export const editProduct = async (
    _id="",
    email="",
    name="",
    code="",
    company_name="",
    price="",
    cost="",
    alert="",
    picture="",
    description="",
    watt=""
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/product/update`;
      const result = await axios.put(url,{
        email,
        name,
        code,
        company_name,
        price,
        cost,
        alert,
        picture,
        description,
        _id,
        watt
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


  export const getAllProductPaginate = async (
    email="",
    page_size="",
    page_number="",
    name=""
    
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/product/by-paginate?email=${email}&page_number=${page_number}&page_size=${page_size}&name=${name}`;
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

  export const deleteProduct = async (
    email="",
    id="",
   
    
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/product/delete?email=${email}&id=${id}`;
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
  export const getAllProduct = async (  
    email="",
   
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/product?email=${email}`;
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

