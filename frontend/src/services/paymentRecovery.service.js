import axios from "axios";
import Config from "../components/config/index";


export const getAllCustomerPendingPayments = async (
    email = "",
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/customer/pending-payments?email=${email}`;
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


  export const updatePendingBalance = async (
    email = "",
    _id="",
    bill_amount="",
    type=""
  ) => {
    try {
      const token = sessionStorage.getItem("token");
      const url = `${Config.baseUrl}/customer/update-balance`;
      const result = await axios.put(url,{
        email,
        _id,
        bill_amount,
        type
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