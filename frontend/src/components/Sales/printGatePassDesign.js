import { Table,tableCellClasses, TableHead, TableRow, TableCell, TableBody,  Typography, TableContainer, Paper, TableFooter } from "@mui/material";
import React, {forwardRef, useEffect, useState} from "react";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import "../../styles/sales.css";
import { decimalNumber, numberWithCommas } from "../../utils/customsFunctions";
import { getCustomerByID } from "../../services/customer.service";
import { styled } from '@mui/material/styles';


const PrintGatePassDesign = forwardRef((props,ref) => {

    const theme = useTheme();
    const email = sessionStorage.getItem("email")
    const {data,customerData} = props;

    return(
        <div ref={ref}>
        <Typography variant="h6" align="center" fontWeight={theme.typography.fontWeightBold} gutterBottom>HYUNDAI SOLAR </Typography>
        <Typography variant="h6" align="center" fontWeight={theme.typography.fontWeightBold} gutterBottom>GATE PASS </Typography>
        <br/>
        <Table  size="small">
        <TableBody >
        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold,  border:1}}>
                DATE:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold , border:1}}>
                {moment().format("DD-MMM-YYYY")}
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold, border:1}}>
                VEHICLE NO:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold , border:1}}>
                {data.invoice_no || ""}
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold,  border:1}}>
                CLIENT:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold , border:1}}>
                {data.customer_name}
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold,  border:1}}>
                ITEM:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold , border:1}}>
                {data.sale_details.map(item=>{
                    return(
                    <Typography fontWeight={theme.typography.fontWeightBold}>{item.name}: {item.qty}</Typography>
                )
                }
                
                )}
            </TableCell>
        </TableRow>
       
        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold,  border:1}}>
                BY:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold ,  border:1}}>
                {data.invoice_by || ""}
            </TableCell>
        </TableRow>
        
        <br/>
        <br/>
       
        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold, border:1}}>
                VEHCILE NO:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold ,  border:1}}>
                {data.vehicle_number}
            </TableCell>
        </TableRow>

        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold,  border:1}}>
                NAME:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold , border:1}}>
                {data.vehicle_person_name || ""}
            </TableCell>
        </TableRow>

        <TableRow >
            <TableCell  sx={{fontWeight:theme.typography.fontWeightBold,  border:1}}>
                ADDRESS:
            </TableCell>
            <TableCell sx={{fontWeight:theme.typography.fontWeightBold ,  border:1}}>
                {data.address || ""}
            </TableCell>
        </TableRow>

        </TableBody>
        </Table>

        </div>
    )

});


export default PrintGatePassDesign;
