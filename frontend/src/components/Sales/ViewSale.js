import {

    Avatar,
    Button,
    MenuItem,
    TextField,
    Typography,
 
} from "@mui/material";
import React, {  useState,useEffect,  useRef } from "react";
import Colors from "../../utils/colors";
import "../../styles/sales.css";
import {
    PaymentMethod,
    decimalNumber,
    numberWithCommas,
} from "../../utils/customsFunctions";
import { useTheme } from "@mui/material/styles";

import ReactToPrint from 'react-to-print';
import PrintDesign from "./PrintDesign";
import PrintDesignA4 from "./PrintDesignA4";
import { getCustomerByID } from "../../services/customer.service";
import PrintGatePassDesign from "./printGatePassDesign";

const ViewSales = (props) => {
    const { data } = props;
    const theme = useTheme();
    const email = sessionStorage.getItem("email")
    const [invoiceDetail, setInvoiceDetail] = useState(
        data.sale_details || []
    );
    const [selectedCustomer, setSelectedCustomer] = useState({name:data?.customer_name, id:data?.customer_id});
    const [vehicleNo, setVehicleNo] = useState(data.vehicle_number || "");
    const [details, setDetails] = useState(data.details || "");
    const [paymentMethod, setPaymentMethod] = useState(data.payment_method || "");
    const [invoiceBy,setInvoiceBy] = useState(data.invoice_by ||"")
    const [vehiclePersonName,setVehiclePersonName] = useState(data.vehicle_person_name || "")
    const [address,setAddress] = useState(data.address || "")
    const componentRef = useRef();

    const componentRefA4 = useRef();
    const componentRefGatePass = useRef();

    const pageStyle = "@page {size: 80mm 3276mm portrait;margin:4mm;}";
    const pageStyleA4 = "@page {size:a4 portrait;margin:0.2in;}";
    const [customerData,setCustomerData] = useState({})

    useEffect(() => { 
        const getCustomerData = async () => {
            try
            {
                const response = await getCustomerByID(email,data.customer_id)
                if(response.data.status == 200)
                  {
                    setCustomerData(response.data.data)
                  }
            }catch(error){
            }
            }
        getCustomerData()
    },[])
 
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
                    </div>
                </td>
                <td className="description">
                    <span>{data.name}</span>
                </td>
                <td className="textAlign">
                    <span>{data.price}</span>
                </td>
                <td className="textAlign">
                    <span>{numberWithCommas(data.qty)}</span>
                </td>
                <td className="textAlign">
                    <span>{numberWithCommas(data.discount)}</span>
                </td>
                <td className="textAlign">
                    <span>{data.product_of}</span>
                </td>
                <td className="textAlign">
                    {numberWithCommas(
                        decimalNumber(data.qty * data.price * data.watt, 2) - data.discount
                    )}
                </td>
            </tr>
    ));

    const getSubtotal = (dataTable) => {
        let t = 0;
        for (let i = 0; i < dataTable.length; i += 1) {
            t += decimalNumber(+dataTable[i].price * +dataTable[i].qty * +dataTable[i].watt, 2);
        }

        return decimalNumber(t, 2);
    };
    const getDiscount = (dataTable) => {
        let t = 0;
        for (let i = 0; i < dataTable.length; i += 1) {
            t += +dataTable[i].discount;
        }

        return decimalNumber(t, 2);
    };

    return (
        <div >
        <div className="hidden ">

        <PrintDesign ref={componentRef}  data={data} customerData={customerData}/>
        <PrintDesignA4 ref={componentRefA4}  data={data} customerData={customerData}/>
        <PrintGatePassDesign ref={componentRefGatePass}  data={data} customerData={customerData}/>
        </div>
       
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-x-3 ">
                <div className=" col-span-2">
                    {invoiceDetail?.length > 0 && (
                        <div id="page-wrap">
                            <table id="items">
                                <thead>
                                    <tr>
                                        <th className="textAlign">Product Code</th>
                                        <th className="textAlign">Product Name</th>
                                        <th className="textAlign">Unit Price</th>
                                        <th className="textAlign">Qty</th>
                                        <th className="textAlign">Discount</th>
                                        <th className="textAlign">Product Of</th>
                                        <th className="textAlign">Total</th>
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
                        <TextField
                            label="Customer Name"
                            fullWidth
                            size="small"
                            sx={{
                                borderColor: Colors.sales.borderColor,
                                input: {
                                    "&::placeholder": {
                                        color: Colors.sales.placeHolderColor,
                                    },
                                },
                            }}
                            inputProps={{ readOnly:true }}
                            value={selectedCustomer.name}
                            onChange={(e) => {
                                setSelectedCustomer({
                                    name: e.target.value?.split("-")?.[1],
                                    id: e.target.value?.split("-")?.[0],
                                });
                            }}
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
                                        color: Colors.sales.placeHolderColor
                                    }
                                }
                            }}
                            inputProps={{ readOnly:true }}
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
                            inputProps={{ readOnly:true }}
                        />
                    </div>
                    <div className="mb-3">
                        <TextField
                            size="small"
                            label="Received Amount"
                            fullWidth
                            sx={{
                                borderColor: Colors.sales.borderColor,
                                input: {
                                    "&::placeholder": {
                                        color: Colors.sales.placeHolderColor,
                                    },
                                },
                            }}
                            value={numberWithCommas((data.total || 0) - (data.remaining_amount || 0))}
                            inputProps={{ readOnly:true }}
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
                                        color: Colors.sales.placeHolderColor
                                    }
                                }
                            }}
                            inputProps={{ readOnly:true }}
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
                            inputProps={{ readOnly:true }}
                        >
                            {PaymentMethod.map((item) => {
                                return (
                                    <MenuItem key={item._id} value={item._id}>
                                        {item.account_title} {item.account_no != item.account_title ? `(${item.account_no})` : ""}
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
                                        color: Colors.sales.placeHolderColor
                                    }
                                }
                            }}
                            inputProps={{ readOnly:true }}
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
                            inputProps={{ readOnly:true }}
                        />
                    </div>
                    
                </div>
            </div>



            <div className="d-flex gap-2">
            <div>
            <ReactToPrint
            
              trigger={() => (
                <Button
                 variant="contained"
                  className="btn-icon btn-link like btn btn-primary btn-sm"
              


                >

                  Print Thermal
                </Button>
              )}
              content={() => componentRef.current}
              documentTitle={`bill ${data.customer_name} ` + new Date().toString().substring(0, 24) + ".pdf"}
              pageStyle={pageStyle}
              
          
            />
            </div>
            <div>

            <ReactToPrint
              trigger={() => (
                <Button
                 variant="contained"
                  className="btn-icon btn-link like btn btn-primary btn-sm"
                >
                  Print A4
                </Button>
              )}
              content={() => componentRefA4.current}
              documentTitle={`bill ${data.customer_name} ` + new Date().toString().substring(0, 24) + ".pdf"}
              pageStyle={pageStyleA4}
              
          
            />
            </div>
            <div>

<ReactToPrint
  trigger={() => (
    <Button
     variant="contained"
      className="btn-icon btn-link like btn btn-primary btn-sm"
    >
      Print Gate Pass
    </Button>
  )}
  content={() => componentRefGatePass.current}
  documentTitle={`Gate Pass ${data.invoice_no ? data.invoice_no : data.customer_name} ` + new Date().toString().substring(0, 24) + ".pdf"}
  pageStyle={pageStyleA4}
  

/>
            </div>
            </div>


        </div>
    );
};

export default ViewSales;
