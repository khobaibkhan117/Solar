import React, { useState, useRef } from "react";
import { Hidden, TextField, Typography, Button } from "@mui/material";
import Colors from "../../utils/colors";
import { useTheme } from "@mui/material/styles";

import { useSnackbar } from "notistack";
import { editProduct } from "../../services/product.service";
import { showAlert } from "../../utils/customsFunctions";

const EditProduct = (props) => {
  const theme = useTheme();
  const { setEditProductModal, refreshData, setRefreshData, selectedProduct } =
    props;

  const email = sessionStorage.getItem("email");
  const { enqueueSnackbar } = useSnackbar();
  const [productName, setProductName] = useState(selectedProduct.name || "");
  const [productCode, setProductCode] = useState(selectedProduct.code || "");
  const [companyName, setCompanyName] = useState(
    selectedProduct.company_name || ""
  );
  const [productDescription, setProductDescription] = useState(
    selectedProduct.description || ""
  );
  const [productPrice, setProductPrice] = useState(selectedProduct.price || "");
  const [productCost, setProductCost] = useState(selectedProduct.cost || "");
  const [productAlert, setProductAlert] = useState(selectedProduct.alert || "");
  const [productWatt, setProductWatt] = useState(selectedProduct.watt || "");
  const [productImage, setProductImage] = useState(
    selectedProduct.picture || ""
  );
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const productUpdate = async () => {
    try {
      if (!productName?.trim()) throw "Please Enter Product Name";
      if (!productCode?.trim()) throw "Please Enter Product Code";
      if (!companyName?.trim()) throw "Please Enter Brand Name";
      if (!productDescription?.trim()) throw "Please Enter Product Description";
      // if(!productPrice?.trim()) throw "Please Enter Product Price"
      if (!productCost?.trim()) throw "Please Enter Product Cost";
      if (!productWatt?.trim()) throw "Please Enter Product Watt";
      // if(!productImage?.trim()) throw "Please Enter Product Image"

      setLoading(true);
      const response = await editProduct(
        selectedProduct._id,
        email,
        productName,
        productCode,
        companyName,
        productPrice,
        productCost,
        productAlert,
        productImage,
        productDescription,
        productWatt
      );

      if (response?.data?.status == 200) {
        setLoading(false);
        setRefreshData(!refreshData);
        showAlert(response.data.message, "success");
        setEditProductModal(false);
      } else {
        setLoading(false);

        showAlert(response.data.message, "error");
      }
    } catch (err) {
      setLoading(false);

      if (err.response) {
        showAlert(err.response.data.message?.toString(), "error");
      } else if (err.message) {
        showAlert(err.message, "error");
      } else if (err) {
        showAlert(err, "error");
      }
    }
  };

  return (
    <div>
      <div className="row mt-5">
        <Hidden mdDown>
          <div className="col-md-2"></div>
        </Hidden>
        <div className="col-sm-12 col-md-4  ">
          <div className="mb-3">
            <TextField
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              fullWidth
              size="small"
              sx={{
                color: Colors.products.textFieldCOlor,
                borderColor: Colors.products.borderColor,
              }}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Product Code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              fullWidth
              size="small"
              sx={{
                color: Colors.products.textFieldCOlor,
                borderColor: Colors.products.borderColor,
              }}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Brand Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              fullWidth
              size="small"
              sx={{
                color: Colors.products.textFieldCOlor,
                borderColor: Colors.products.borderColor,
              }}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Description"
              value={productDescription}
              onChange={(e) =>
                setProductDescription(e.target.value?.slice(0, 124))
              }
              multiline
              rows={3}
              maxRows={3}
              fullWidth
              size="small"
              sx={{
                color: Colors.products.textFieldCOlor,
                borderColor: Colors.products.borderColor,
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-2">
          {/* <div className="mb-3">
            <TextField label="Price"
            value={productPrice}
            onChange={(e)=>setProductPrice(e.target.value?.replace(/[^0-9]/gi, ""))} 
            
              fullWidth  size="small" sx={{color:Colors.products.textFieldCOlor, borderColor:Colors.products.borderColor}}  />

            </div> */}
          <div className="mb-3">
            <TextField
              label="Cost"
              value={productCost}
              onChange={(e) =>
                setProductCost(e.target.value?.replace(/[^0-9.]/gi, ""))
              }
              fullWidth
              size="small"
              sx={{
                color: Colors.products.textFieldCOlor,
                borderColor: Colors.products.borderColor,
              }}
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Watt"
              value={productWatt}
              onChange={(e) =>
                setProductWatt(e.target.value?.replace(/[^0-9.]/gi, ""))
              }
              fullWidth
              size="small"
              sx={{
                color: Colors.products.textFieldCOlor,
                borderColor: Colors.products.borderColor,
              }}
            />
          </div>
          <div className="mb-2" onClick={() => imageRef?.current?.click()}>
            <div
              className="mb-1"
              style={{
                color: Colors.products.borderColor,
                textAlign: "center",
                border: `1px solid ${Colors.products.borderColor}`,
                borderRadius: "5px",
              }}
            >
              {productImage ? (
                <img
                  src={productImage}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "110px",
                    backgroundSize: "cover",
                  }}
                />
              ) : (
                <i
                  className="ion-ios-camera-outline "
                  style={{
                    fontSize: "2rem",
                    color: Colors.products.borderColor,
                  }}
                />
              )}
            </div>
            <Typography
              fontWeight={theme.typography.fontWeightBoldx}
              textAlign="center"
              sx={{ color: Colors.products.textFieldCOlor }}
            >
              Upload Image
            </Typography>
          </div>
          <div className="mb-3">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                try {
                  const reader = new FileReader();
                  reader.readAsDataURL(event.target.files[0]);
                  reader.onloadend = () => {
                    setProductImage(reader.result);
                  };

                  event.target.value = null;
                } catch (err) {
                  console.log(err);
                }
              }}
              ref={imageRef}
              style={{ display: "none" }}
            />
            <Button
              className="fw-bold"
              onClick={() => productUpdate()}
              disabled={loading}
              sx={{ backgroundColor: Colors.products.buttonColor }}
              fullWidth
              variant="contained"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
