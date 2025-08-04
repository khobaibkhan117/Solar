import {
    Avatar,
    TextField,
    Autocomplete,
    Typography,
    useTheme,
    SvgIcon,
    Checkbox,
    Button,
  } from "@mui/material";
  import React, { useRef, useState, useEffect } from "react";
  import Colors from "../../utils/colors";
  import { showAlert } from "../../utils/customsFunctions";
  import { getAllproductOf } from "../../services/productOf.service";
  import parse from "autosuggest-highlight/parse";
  import match from "autosuggest-highlight/match";
  import CheckboxTree from "react-checkbox-tree";
  import "react-checkbox-tree/lib/react-checkbox-tree.css";
  
  import MENU from "../../utils/menu";
  import { userAdd, userUpdate } from "../../services/auth.service";
  
  const ViewUser = (props) => {
    const {data } = props;
    const theme = useTheme();
    const product_of = sessionStorage.getItem("product_of") || "";
    const product_of_id = sessionStorage.getItem("product_of_id") || "";
    const email = sessionStorage.getItem("email");
    const [profilePicture, setProfilePicture] = useState(data.profile_picture || "");
    const [name, setName] = useState(data?.name || "");
    const [userEmail, setUserEmail] = useState(data?.email || "");
    const [contactNo, setContactNo] = useState(data?.contact_no || "");

    const [allProductOf, setAllProductOf] = useState([]);
    const [selectedProductOf, setSelectedProductOf] = useState(data?.product_of ? {_id:data.product_of_id, name:data.product_of} : {});
    const [selectedFeature, setSelectedFeature] = useState(JSON.parse(data?.features || "[]")?.map(item=>item.name) ||[]);
    const [expandedFeature, setExpandedFeature] = useState(  []);

  
    useEffect(() => {
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
  
      getProductOf();
    }, []);
  
   
  
    return (
      <div>
        <div className="flex justify-center mb-3">
          <Avatar
            sx={{ width: "120px", height: "120px" }}
            src={profilePicture || ""}
           
          />
          
        </div>
        <div className="grid grid-cols-2 gap-x-3">
          <div>
            <div className="mb-3">
              <TextField
                fullWidth
                size="small"
                label="Name"
                inputProps={{readOnly:true}}
                onChange={(e) => setName(e.target.value)}
                value={name}
                sx={{
                  color: Colors.user.textFieldColor,
                  borderColor: Colors.user.borderColor,
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                size="small"
                label="Email"
                onChange={(e) => setUserEmail(e.target.value)}
                inputProps={{readOnly:true}}
                value={userEmail}
                sx={{
                  color: Colors.user.textFieldColor,
                  borderColor: Colors.user.borderColor,
                }}
              />
            </div>
  
            <div className="mb-3">
              <TextField
                fullWidth
                size="small"
                inputProps={{readOnly:true}}
                label="Contact No"
                onChange={(e) => setContactNo(e.target.value)}
                value={contactNo}
                sx={{
                  color: Colors.user.textFieldColor,
                  borderColor: Colors.user.borderColor,
                }}
              />
            </div>
  
            {!product_of && (
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
                        ? allProductOf.find(
                            (item) => item._id == selectedProductOf._id
                          )?.name || setSelectedProductOf({})
                        : setSelectedProductOf({});
                    }
                  }}
                  inputValue={selectedProductOf?.name || ""}
                  value={selectedProductOf?.name || ""}
                  readOnly
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
                        setSelectedProductOf({ name: e.target.value });
                      }}
                    />
                  )}
                  onChange={(e, value) => {
                    if (value?._id) {
                      setSelectedProductOf({
                        name: value?.name,
                        _id: value?._id,
                      });
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
            )}
  
          
          </div>
          <div>
            <Typography
              fontWeight={theme.typography.fontWeightBold}
              className="ps-3 mb-2"
            >
              Assign Features
            </Typography>
            <CheckboxTree
              nodes={[
                {
                  value: "Features",
                  label: "Features",
                  children: [
                    ...MENU.map((item) => {
                      return { ...item, label: item.name, value: item.name };
                    }),
                  ],
                },
              ]}
              disabled
              checked={selectedFeature}
              expanded={expandedFeature}
              onCheck={(checked) => setSelectedFeature(checked)}
              onExpand={(expanded) => setExpandedFeature(expanded)}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ViewUser;
  