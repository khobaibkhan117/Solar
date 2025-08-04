import {
  Autocomplete,
  Avatar,
  MenuItem,
  TextField,
  Typography,
  Button,
  IconButton,
  createFilterOptions,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../utils/colors";
import "../../styles/sales.css";
import {
  PaymentMethod,
  decimalNumber,
  numberWithCommas,
} from "../../utils/customsFunctions";
import { useTheme } from "@mui/material/styles";
import { getAllCustomer } from "../../services/customer.service";
import { getAllProduct } from "../../services/product.service";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useSnackbar } from "notistack";
import { saleAdd } from "../../services/sale.service";
import { getAllInventory } from "../../services/inventory.service";
import { getAllproductOf } from "../../services/productOf.service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { showAlert } from "../../utils/customsFunctions";
import { getAllBank } from "../../services/bank.service";
import PrintDesign from "./PrintDesign";
import PrintDesignA4 from "./PrintDesignA4";
import ReactToPrint from "react-to-print";
import PrintGatePassDesign from "./printGatePassDesign";

const filter = createFilterOptions();

const AddSales = (props) => {
  const { setAddSaleModal, refreshData, setRefreshData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const email = sessionStorage.getItem("email");
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [vehicleNo, setVehicleNo] = useState("");
  const [details, setDetails] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [allProductOf, setAllProductOf] = useState([]);
  const [allInventory, setAllInventory] = useState([]);
  const [loadProductData, setLoadProductData] = useState(true);
  const [allBanks, setAllBanks] = useState([]);
  const [receivedAmount, setReceivedAmount] = useState("");
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [invoicePrintData, setInvoicePrintData] = useState({});
  const [invoiceBy, setInvoiceBy] = useState("");
  const [vehiclePersonName, setVehiclePersonName] = useState("");
  const [address, setAddress] = useState("");
  const componentRef = useRef();
  const componentRefGatePass = useRef();
  const componentRefA4 = useRef();

  const pageStyle = "@page {size: 80mm 3276mm portrait;margin:4mm;}";
  const pageStyleA4 = "@page {size:a4 portrait;margin:0.2in;}";

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const response = await getAllCustomer(email);
        if (response.status == 200) {
          setAllCustomer(response.data.data);
        } else {
          setAllCustomer([]);
        }
      } catch (err) {
        setAllCustomer([]);
      }
    };
    const getProductData = async () => {
      try {
        const response = await getAllProduct(email);
        if (response.status == 200) {
          setAllProduct(response.data.data);
          setLoadProductData(false);
        } else {
          setLoadProductData(false);
          setAllProduct([]);
        }
      } catch (err) {
        setLoadProductData(false);
        setAllProduct([]);
      }
    };
    const getInventoryData = async () => {
      try {
        const response = await getAllInventory(email);
        if (response.status == 200) {
          setAllInventory(response.data.data);
        } else {
          setAllInventory([]);
        }
      } catch (err) {
        setAllInventory([]);
      }
    };

    const getProductOfData = async () => {
      try {
        const response = await getAllproductOf(email);
        if (response.status == 200) {
          setAllProductOf(response.data.data);
        } else {
          setAllProductOf([]);
        }
      } catch (err) {
        setAllInventory([]);
      }
    };
    const getBankData = async () => {
      try {
        const response = await getAllBank(email);
        if (response.status == 200) {
          setAllBanks([...PaymentMethod, ...response.data.data]);
        } else {
          setAllBanks([...PaymentMethod]);
        }
      } catch (err) {
        setAllBanks([...PaymentMethod]);
      }
    };

    getCustomerData();
    getProductData();
    getInventoryData();
    getProductOfData();
    getBankData();
  }, []);

  const newProductAdd = (code, name, price, picture, watt, cost_price) => ({
    code,
    name,
    price: parseFloat("0"),
    qty: "",
    discount: "",
    product_of: "",
    total: "",
    picture,
    watt,
    product_of_id: "",
    cost_price,
  });

  const updateItem = (id, itemAttributes, tempIndex) => {
    try {
      const index = invoiceDetail.findIndex(
        (x, ind) => x.code === id && ind == tempIndex
      );

      if (index === -1) {
        console.error("Something wen't wrong");
      } else {
        const data = [
          ...invoiceDetail.slice(0, index),
          { ...invoiceDetail[index], ...itemAttributes },
          ...invoiceDetail.slice(index + 1),
        ];
        setInvoiceDetail([...data]);
      }
    } catch (err) {
      console.log("Error====", err);
    }
  };
  const handleChangeTable = (name, id, event, index) => {
    if (name == "product_of") {
      updateItem(
        id,
        {
          [name]: event.target.value?.split("-")?.[0],
          product_of_id: event.target.value?.split("-")?.[1],
        },
        index
      );
    } else {
      updateItem(id, { [name]: event.target.value }, index);
    }
  };

  const handleChangePrice = (name, id, event, index) => {
    updateItem(
      id,
      { [name]: event.target.value?.replace(/[^0-9.]/gi, "") },
      index
    );
  };
  const getRow = (dataArray) =>
    dataArray.map((data, index) => (
      <tr className="item-row" key={index.toString()}>
        <td className="item-name">
          <div className="delete-wpr flex items-center gap-x-1">
            <Avatar
              src={data.picture}
              sx={{
                width: "25px",
                height: "25px",
                border: `2px solid ${Colors.sales.borderColor}`,
              }}
              variant="circular"
            />
            <span>{data?.code}</span>

            {/* <a className="delete" href="#" onClick={(e) => handleRemoveRow(e, data)} title="Remove row">X</a> */}
          </div>
        </td>
        <td className="description">
          <span>{data.name}</span>
        </td>
        <td className="textAlign">
          <span>{data.watt}</span>
        </td>
        <td className="textAlign">
          <textarea
            value={numberWithCommas(data.price)}
            onChange={(e) => {
              handleChangePrice("price", data?.code, e, index);
            }}
          />
        </td>
        <td className="textAlign">
          <textarea
            value={numberWithCommas(data.qty)}
            onChange={(e) => {
              if (data.product_of) {
                handleInventoryItem("qty", data, e, index);
              } else {
                handleChangePrice("qty", data?.code, e, index);
              }
            }}
          />
        </td>
        <td className="textAlign">
          <textarea
            value={numberWithCommas(data.discount)}
            onChange={(e) =>
              handleChangePrice("discount", data?.code, e, index)
            }
          />
        </td>
        <td className="textAlign">
          <TextField
            size="small"
            fullWidth
            sx={{
              color: Colors.customer.textFieldColor,
              borderColor: Colors.customer.borderColor,
              border: 0,
            }}
            select
            value={`${data.product_of}-${data.product_of_id}` || ""}
            onChange={(e) => {
              handleInventoryItem("product_of", data, e, index);
            }}
          >
            {allProductOf?.map((item) => {
              return (
                <MenuItem key={item._id} value={`${item.name}-${item._id}`}>
                  {item.name}
                </MenuItem>
              );
            })}
          </TextField>
        </td>
        <td className="textAlign">
          {numberWithCommas(
            decimalNumber(data.qty * data.price * data.watt, 2) - data.discount
          )}
        </td>
        <td>
          <IconButton onClick={(e) => handleRemoveRow(e, index)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </td>
      </tr>
    ));

  const handleInventoryItem = (name, data, event, index) => {
    if (name == "product_of") {
      let findInventoryItem = allInventory.find(
        (item) =>
          item.product_code == data.code &&
          item.product_of_id == event.target.value?.split("-")?.[1]
      );
      if (findInventoryItem) {
        if (+findInventoryItem.quantity >= +data.qty) {
          handleChangeTable(name, data.code, event, index);
        } else {
          showAlert(
            `Max Quantity Limit is ${findInventoryItem.quantity}`,
            "error"
          );
        }
      } else {
        showAlert(`This Product is not Available in Inventory`, "error");
      }
    } else if (name == "qty") {
      let findInventoryItem = allInventory.find(
        (item) =>
          item.product_code == data.code &&
          item.product_of_id == data.product_of_id
      );
      if (findInventoryItem) {
        if (
          +findInventoryItem.quantity >=
          +event.target.value?.replace(/[^0-9]/gi, "")
        ) {
          handleChangePrice(name, data.code, event, index);
        } else {
          showAlert(
            `Max Quantity Limit is ${findInventoryItem.quantity}`,
            "error"
          );
        }
      } else {
        showAlert(`This Product is not Available in Inventory`, "error");
      }
    }
  };

  const handleRemoveRow = (e, index) => {
    e.preventDefault();
    setInvoiceDetail([
      ...invoiceDetail.filter((item, index2) => index != index2),
    ]);
  };

  const getSubtotal = (dataTable) => {
    let t = 0;
    for (let i = 0; i < dataTable.length; i += 1) {
      t += decimalNumber(
        dataTable[i].price * dataTable[i].qty * dataTable[i].watt,
        2
      );
    }

    return decimalNumber(t, 2);
  };
  const getDiscount = (dataTable) => {
    let t = 0;
    for (let i = 0; i < dataTable.length; i += 1) {
      t += parseFloat(dataTable[i].discount);
    }

    return decimalNumber(t, 2);
  };

  const saleAddData = async () => {
    try {
      if (invoiceDetail?.length == 0) throw "Please Select Products";
      if (!selectedCustomer?.name?.trim()) throw "Please Select Customer";
      if (!paymentMethod?.trim()) throw "Please Select Payment Mehod";
      if (invoiceDetail.filter((item) => !item.product_of).length > 0)
        throw "Please Select Product Of";
      setLoading(true);
      const response = await saleAdd(
        email,
        invoiceDetail,
        selectedCustomer?.name,
        selectedCustomer?.id,
        getDiscount(invoiceDetail),
        getSubtotal(invoiceDetail),
        getSubtotal(invoiceDetail) - getDiscount(invoiceDetail),
        selectedCustomer?.id?.includes("_new_customer") ? "Walk-In" : "Regular",
        vehicleNo,
        details,
        paymentMethod,
        +receivedAmount ||
          getSubtotal(invoiceDetail) - getDiscount(invoiceDetail),
        getSubtotal(invoiceDetail) -
          getDiscount(invoiceDetail) -
          +receivedAmount || 0,
        invoiceBy,
        vehiclePersonName,
        address
      );

      if (response?.data?.status == 200) {
        setLoading(false);
        setRefreshData(!refreshData);
        showAlert(response.data.message, "success");
        // setAddSaleModal(false)
        setInvoicePrintData(response.data.data);
        setShowPrintOptions(true);
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
    <div className="mt-5">
      {showPrintOptions && (
        <div className="hidden ">
          <PrintDesign
            ref={componentRef}
            data={invoicePrintData.print}
            customerData={invoicePrintData.customer}
          />
          <PrintDesignA4
            ref={componentRefA4}
            data={invoicePrintData.print}
            customerData={invoicePrintData.customer}
          />
          <PrintGatePassDesign
            ref={componentRefGatePass}
            data={invoicePrintData.print}
            customerData={invoicePrintData.customer}
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-x-3">
        <div className=" col-span-2">
          <div style={{ padding: "0 0 0 20px" }}>
            <Autocomplete
              disableClearable={!selectProduct}
              size="small"
              loading={loadProductData}
              sx={{
                width: "100%",
              }}
              options={
                !allProduct ? [{ name: "Loading...", id: 0 }] : allProduct
              }
              getOptionLabel={(option) =>
                `${option?.name} (${option?.code})` || ""
              }
              onClose={(event, reason) => {
                if (reason != "selectOption") {
                  selectProduct
                    ? allProduct.find((item) => item._id == selectProduct)
                        ?.name || setSelectProduct("")
                    : setSelectProduct("");
                }
              }}
              inputValue={selectProduct || ""}
              value={selectProduct || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Product name or Product Code"
                  margin="none"
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: Colors.sales.borderColor,
                    input: {
                      "&::placeholder": {
                        color: Colors.sales.placeHolderColor,
                      },
                    },
                  }}
                  onChange={(e) => {
                    setSelectProduct(e.target.value);
                  }}
                />
              )}
              onChange={(e, value) => {
                if (value?.code) {
                  setSelectProduct("");
                  setInvoiceDetail([
                    ...invoiceDetail,
                    newProductAdd(
                      value?.code,
                      value?.name,
                      value?.price,
                      value?.picture,
                      value?.watt,
                      value?.cost
                    ),
                  ]);
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
                const parts = parse(
                  `${option?.name} (${option?.code})`,
                  matches
                );
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
          {invoiceDetail?.length > 0 && (
            <div id="page-wrap">
              <table id="items">
                <thead>
                  <tr>
                    <th className="textAlign">Product Code</th>
                    <th className="textAlign">Product Name</th>
                    <th className="textAlign">Watt</th>
                    <th className="textAlign">Unit Price</th>
                    <th className="textAlign">Qty</th>
                    <th className="textAlign">Discount</th>
                    <th className="textAlign">Product Of</th>
                    <th className="textAlign">Total</th>
                    <th className="textAlign">Action</th>
                  </tr>
                </thead>
                <tbody>{getRow(invoiceDetail)}</tbody>
              </table>
              <div className="grid grid-cols-3">
                <div className=" col-span-2 bg-[#5AC6FF4F] ">
                  <div className="flex items-center mb-3">
                    <Typography
                      fontWeight={theme.typography.fontWeightBold}
                      className="ps-2"
                      sx={{ color: Colors.sales.headColor, fontSize: "1.6rem" }}
                    >
                      Sub Total :
                    </Typography>
                    <Typography className="ms-3" sx={{ fontSize: "1.3rem" }}>
                      {" "}
                      {`Rs ${numberWithCommas(
                        getSubtotal(invoiceDetail)
                      )}`}{" "}
                    </Typography>
                  </div>
                  <div className="flex items-center ">
                    <Typography
                      fontWeight={theme.typography.fontWeightBold}
                      className="ps-2"
                      sx={{ color: Colors.sales.headColor, fontSize: "1.6rem" }}
                    >
                      Discount &nbsp;:
                    </Typography>
                    <Typography className="ms-3" sx={{ fontSize: "1.3rem" }}>
                      {" "}
                      {`Rs ${numberWithCommas(
                        getDiscount(invoiceDetail)
                      )}`}{" "}
                    </Typography>
                  </div>
                </div>
                <div className=" bg-[#568BA799] flex flex-col items-center justify-center ">
                  <div className=" text-white font-bold text-xl">
                    Grand Total{" "}
                  </div>
                  <div className="text-white font-bold text-2xl">
                    {`Rs. ${numberWithCommas(
                      getSubtotal(invoiceDetail) - getDiscount(invoiceDetail)
                    )}`}{" "}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="mb-3">
            <Autocomplete
              size="small"
              value={selectedCustomer.name || ""}
              inputValue={selectedCustomer.name || ""}
              onChange={(event, newValue) => {
                if (newValue?._id) {
                  setSelectedCustomer({
                    name: newValue.name,
                    id: newValue._id,
                    add: newValue.add ? newValue.add : "",
                  });
                } else {
                  setSelectedCustomer({ name: "", id: "" });
                }

                setReceivedAmount("");
              }}
              onClose={(event, reason) => {
                if (reason == "blur" && !selectedCustomer?.id) {
                  setSelectedCustomer({ name: "", id: "" });
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) =>
                    inputValue?.toLowerCase() === option.name?.toLowerCase()
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    _id: `${new Date().getTime()}_new_customer`,
                    name: inputValue,
                    add: `Add ${inputValue}`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={allCustomer}
              getOptionLabel={(option) => {
                if (option.add) {
                  return option.add;
                } else {
                  return option.name;
                }
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.add ? option.add : option.name}</li>
              )}
              //   sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Customer Name"
                  onChange={(e) =>
                    setSelectedCustomer({ name: e.target.value, id: "" })
                  }
                />
              )}
            />
          </div>
          <div className="mb-3">
            <TextField
              size="small"
              label="Vehicle Person Name"
              fullWidth
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              value={vehiclePersonName}
              onChange={(e) => setVehiclePersonName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              size="small"
              label="Vehicle No"
              fullWidth
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <TextField
              size="small"
              label="Received Amount"
              fullWidth
              inputProps={{
                readOnly:
                  selectedCustomer?.id?.includes("_new_customer") ||
                  !selectedCustomer?.id
                    ? true
                    : false,
              }}
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              type="number"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              size="small"
              label="Invoice By"
              fullWidth
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              value={invoiceBy}
              onChange={(e) => setInvoiceBy(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <TextField
              label="Payment Method"
              select
              fullWidth
              SelectProps={{
                MenuProps: {
                  sx: {
                    ".MuiList-root": {
                      backgroundColor: Colors.sales.dropDownMenuColor,
                      fontWeight: theme.typography.fontWeightBold,
                    },
                  },
                },
              }}
              size="small"
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {allBanks.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.account_title}{" "}
                    {item.account_no != item.account_title
                      ? `(${item.account_no})`
                      : ""}
                  </MenuItem>
                );
              })}
            </TextField>
          </div>
          <div className="mb-3">
            <TextField
              size="small"
              label="Address"
              multiline
              rows={3}
              fullWidth
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <TextField
              size="small"
              label="Details"
              multiline
              rows={3}
              fullWidth
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          {!showPrintOptions && (
            <div className="mb-3">
              <Button
                className="fw-bold"
                onClick={() => saleAddData()}
                disabled={loading}
                sx={{ backgroundColor: Colors.sales.buttonColor }}
                fullWidth
                variant="contained"
              >
                Proceed
              </Button>
            </div>
          )}

          {showPrintOptions && (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      variant="contained"
                      fullWidth
                      className="btn-icon btn-link like btn btn-primary btn-sm"
                    >
                      Print Thermal
                    </Button>
                  )}
                  content={() => componentRef.current}
                  documentTitle={
                    `bill ${invoicePrintData?.print?.customer_name} ` +
                    new Date().toString().substring(0, 24) +
                    ".pdf"
                  }
                  pageStyle={pageStyle}
                />
              </div>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      variant="contained"
                      fullWidth
                      className="btn-icon btn-link like btn btn-primary btn-sm"
                    >
                      Print A4
                    </Button>
                  )}
                  content={() => componentRefA4.current}
                  documentTitle={
                    `bill ${invoicePrintData?.print?.customer_name} ` +
                    new Date().toString().substring(0, 24) +
                    ".pdf"
                  }
                  pageStyle={pageStyleA4}
                />
              </div>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      variant="contained"
                      fullWidth
                      className="btn-icon btn-link like btn btn-primary btn-sm"
                    >
                      Print Gate Pass
                    </Button>
                  )}
                  content={() => componentRefGatePass.current}
                  documentTitle={
                    `Gate Pass ${
                      invoicePrintData?.print?.invoice_no
                        ? invoicePrintData?.print?.invoice_no
                        : invoicePrintData?.print?.customer_name
                    } ` +
                    new Date().toString().substring(0, 24) +
                    ".pdf"
                  }
                  pageStyle={pageStyleA4}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSales;
