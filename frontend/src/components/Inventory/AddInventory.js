import React, { useState, useEffect } from "react";
import { getAllProduct } from "../../services/product.service";
import { getAllproductOf } from "../../services/productOf.service";
import Colors from "../../utils/colors";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { addInventory } from "../../services/inventory.service";
import { showAlert } from "../../utils/customsFunctions";

const AddInventory = (props) => {
    const {setRefreshData,refreshData,setAddInventoryModal} = props
  const { enqueueSnackbar } = useSnackbar();
  const email = sessionStorage.getItem("email");
  const [allProducts, setAllProducts] = useState([]);
  const [allProductOf, setAllProductOf] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedProductOf, setSelectedProductOf] = useState({});
  const [quantity,setQuantity] = useState("")
  const [damage,setDamage] = useState("")
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getAllProduct(email);
        if (response.status == 200) {
          setAllProducts(response.data.data);
        } else {
          showAlert(response.data.message?.toString(), "error");
        }
      } catch (err) {
        if (err.response) {
          showAlert(err.response.data.message?.toString(), "error");
        } else if (err.message) {
          showAlert(err.message, "error");
        } else if (err) {
          showAlert(err, "error");
        }
      }
    };

    const getProductOf = async () => {
      try {
        const response = await getAllproductOf(email);
        if (response.status == 200) {
          setAllProductOf(response.data.data);
        } else {
          showAlert(response.data.message?.toString(), "error");
        }
      } catch (err) {
        if (err.response) {
          showAlert(err.response.data.message?.toString(), "error");
        } else if (err.message) {
          showAlert(err.message, "error");
        } else if (err) {
          showAlert(err, "error");
        }
      }
    };

    getProduct();
    getProductOf();
  }, []);

 
  const inventoryAddData = async()=>{
    try{
        if(!selectedProduct?.product_code?.trim()) throw "Please Select product"
        if(!selectedProductOf?._id?.trim()) throw "Please Select Product Of"
        if(!quantity?.trim()) throw "Please Enter Quantity"
       

        setLoading(true)
        const response =await addInventory(email,selectedProduct?.product_name,selectedProduct?.product_code,selectedProduct.product_picture,selectedProductOf?.name,selectedProductOf?._id,parseInt(quantity), parseInt(damage || "0"))

        if(response?.data?.status == 200)
        {
            setLoading(false);
            setRefreshData(!refreshData)
            showAlert(response.data.message,"success")
            setAddInventoryModal(false)


        }else{
            setLoading(false);
        
            showAlert(response.data.message,"error");
        }


    }catch(err)
    {
        setLoading(false);
        
          if (err.response) {
            showAlert(err.response.data.message?.toString(),"error");
          } else if (err.message) {
            showAlert(err.message,"error");
          } else if (err) {
            showAlert(err,"error");
          }

    }
}


  return (
    <div>
      <div className="mb-3">
        <Autocomplete
          disableClearable={!selectedProduct?.product_code}
          size="small"
          sx={{
            width: "100%",
          }}
          options={!allProducts ? [{ name: "Loading...", id: 0 }] : allProducts}
          getOptionLabel={(option) => `${option?.name} (${option?.code})` || ""}
          onClose={(event, reason) => {
            if (reason != "selectOption") {
              selectedProduct?.name
                ? allProducts.find(
                    (item) => item.code == selectedProduct.product_code
                  )?.name || setSelectedProduct({})
                : setSelectedProduct({});
            }
          }}
          inputValue={
            selectedProduct?.product_code
              ? `${selectedProduct?.product_name} (${selectedProduct?.product_code})`
              :  selectedProduct?.product_name
             ?selectedProduct?.product_name
             : ""
          }
          value={
            selectedProduct?.product_code
              ? `${selectedProduct?.product_name} (${selectedProduct?.product_code})`
             : selectedProduct?.product_name
            ? selectedProduct?.product_name : ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Product name or Product Code"
              margin="none"
              fullWidth
              variant="outlined"
              sx={{
                borderColor: Colors.inventory.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.inventory.placeHolderColor,
                  },
                },
              }}
              onChange={(e) => {
                setSelectedProduct({ product_name: e.target.value, product_code:"" });
              }}
            />
          )}
          onChange={(e, value) => {
            if (value?.code) {
              setSelectedProduct({
                product_code: value?.code,
                product_name: value?.name,
                product_picture: value?.picture,
              });
            } else {
              setSelectedProduct({});
            }
          }}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(
              `${option?.name} (${option?.code})`,
              inputValue,
              {
                insideWords: true,
              }
            );
            const parts = parse(`${option?.name} (${option?.code})`, matches);
            return (
              <li {...props} key={option?._id}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <Autocomplete
          disableClearable={!selectedProductOf?._id}
          size="small"
          sx={{
            width: "100%",
          }}
          options={
            !allProductOf ? [{ name: "Loading...", id: 0 }] : allProductOf
          }
          getOptionLabel={(option) => `${option?.name}` || ""}
          onClose={(event, reason) => {
            if (reason != "selectOption") {
              selectedProductOf?.name
                ? allProductOf.find((item) => item._id == selectedProductOf._id)
                    ?.name || setSelectedProductOf({})
                : setSelectedProductOf({});
            }
          }}
          inputValue={selectedProductOf?.name || ""}
          value={selectedProductOf?.name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Product Of"
              margin="none"
              fullWidth
              variant="outlined"
              sx={{
                borderColor: Colors.inventory.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.inventory.placeHolderColor,
                  },
                },
              }}
              onChange={(e) => {
                setSelectedProductOf({ name: e.target.value,_id: ""});
              }}
            />
          )}
          onChange={(e, value) => {
            if (value?._id) {
              setSelectedProductOf({ name: value?.name, _id: value?._id });
            } else {
              setSelectedProductOf({});
            }
          }}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(`${option?.name}`, inputValue, {
              insideWords: true,
            });
            const parts = parse(`${option?.name}`, matches);
            return (
              <li {...props} key={option?._id}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />
      </div>

      <div className="mb-3">
      <TextField
             
              label="Quantity"
              margin="none"
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                borderColor: Colors.inventory.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.inventory.placeHolderColor,
                  },
                },
              }}
              onChange={(e) => {
                setQuantity(e.target.value?.replace(/[^0-9]/gi, ""));
              }}
              value={quantity}
            />

      </div>

      <div className="mb-3">
      <TextField
             
              label="Damage Quantity"
              margin="none"
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                borderColor: Colors.inventory.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.inventory.placeHolderColor,
                  },
                },
              }}
              onChange={(e) => {
                setDamage(e.target.value?.replace(/[^0-9]/gi, ""));
              }}
              value={damage}
            />

      </div>

      <div className="mb-3">
      <div className="mb-3">
                <Button className="fw-bold"
                    onClick={()=>inventoryAddData()}
                    disabled={loading}
                    sx={{ backgroundColor: Colors.inventory.buttonColor }} fullWidth variant="contained" >Submit</Button>

            </div>
      </div>
    </div>
  );
};

export default AddInventory;
