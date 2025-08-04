import { Table,tableCellClasses, TableHead, TableRow, TableCell, TableBody,  Typography, TableContainer, Paper, TableFooter } from "@mui/material";
import React, {forwardRef, useEffect, useState} from "react";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import "../../styles/sales.css";
import { decimalNumber, numberWithCommas } from "../../utils/customsFunctions";
import { getCustomerByID } from "../../services/customer.service";
import { styled } from '@mui/material/styles';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  
}));

const PrintDesignA4 = forwardRef((props,ref) => {
    const theme = useTheme();
    const email = sessionStorage.getItem("email")
    const {data,customerData} = props;


    const getRow = (dataArray) =>
        dataArray.map((data, index) => (
            <StyledTableRow key={index.toString()}  sx={{border:"1px solid #000"}}>
                <StyledTableCell sx={{border:"1px solid #000"}} className="item-name" >
                    {index + 1}
                </StyledTableCell>
                <StyledTableCell sx={{border:"1px solid #000"}} className="description">
                    <span>{data.name}</span>
                </StyledTableCell>
                <StyledTableCell sx={{border:"1px solid #000"}}  align="right" className="textAlign">
                    <span>{numberWithCommas(data.qty)}</span>
                </StyledTableCell>
                <StyledTableCell sx={{border:"1px solid #000"}}  align="right" className="textAlign">
                    <span>{numberWithCommas(data.watt)}</span>
                </StyledTableCell>
                <StyledTableCell sx={{border:"1px solid #000"}}  align="right" className="textAlign">
                    <span>{data.price}</span>
                </StyledTableCell>
                <StyledTableCell sx={{border:"1px solid #000"}} align="right" className="textAlign">
                    {numberWithCommas(
                        decimalNumber(data.qty * data.price * data.watt, 2) - data.discount
                    )}
                </StyledTableCell>
            </StyledTableRow>
        ));
    return (
        <div ref={ref}>
        <div className="grid grid-cols-3">
        <div className="col-span-2 pb-3" >
           <h1>SolarOne</h1>
           </div>

           <div className="col-span-1">
           <h1>INVOICE</h1>
           </div>

         </div>
            

              <div className="grid  grid-cols-2 mt-4">
              <div className="mb-2">
              <Typography fontWeight={theme.typography.fontWeightBold}>
               Bill To: <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{data.customer_name}</Typography>
              </Typography>

              </div>

              <div className="mb-2 grid grid-cols-2">
              <Typography fontWeight={theme.typography.fontWeightBold} align="right">
                Invoice No: 
              </Typography>
              <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{data.sale_id}</Typography>

              </div>
              <div className="mb-2 ">
              <Typography fontWeight={theme.typography.fontWeightBold}>
               Phone: <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{customerData?.contact_no || ""}</Typography>
              </Typography>
              

              </div>
              <div className="mb-2  grid grid-cols-2">
              <Typography fontWeight={theme.typography.fontWeightBold} align="right">
                Date: 
              </Typography>
              <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{moment(data.creation_time).format("DD-MMM-YYYY")}</Typography>

              </div>
             
              

              </div>

       
              
            <Table  size="small">
                <TableHead >
                    <TableRow >
                        <TableCell sx={{border:"1px solid #000", fontWeight:'bold'}}  className="textAlign">Sr.No</TableCell>
                        <TableCell sx={{border:"1px solid #000",fontWeight:'bold'}} className="textAlign">Description</TableCell>
                        <TableCell sx={{border:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">QTY</TableCell>
                        <TableCell sx={{border:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">Watt</TableCell>
                        <TableCell sx={{border:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">Unit Price</TableCell>
                        <TableCell sx={{border:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">Total</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>{getRow(data.sale_details)}</TableBody>
                <TableFooter >
                    <TableRow>
                        <TableCell sx={{borderBottom:"1px solid #fff"}} align="right" colSpan={5}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>GRAND TOTAL :</Typography></TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000"}} align="right" colSpan={1}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>{numberWithCommas(data.total || 0)}</Typography></TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell sx={{borderBottom:"1px solid #fff"}} align="right" colSpan={5}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>RECEIVED PAYMENT :</Typography></TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000"}} align="right" colSpan={1}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>{numberWithCommas((data.total || 0)- (data.remaining_amount || 0))}</Typography></TableCell>

                    </TableRow>
                    <TableRow>
                    <TableCell sx={{borderBottom:"1px solid #fff"}} align="center" colSpan={2}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>Thank You For Your Business…..</Typography></TableCell>
                        <TableCell sx={{borderBottom:"1px solid #fff"}} align="right" colSpan={3}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>BALANCE PAYMENT :</Typography></TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000"}} align="right" colSpan={1}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>{numberWithCommas(data.remaining_amount || 0)}</Typography></TableCell>

                    </TableRow>
                </TableFooter>
                </Table>

                

           <div className="grid grid-cols-3 mt-5">
           <div>
           <Typography className="mb-3" fontWeight={theme.typography.fontWeightBold}>Prepared by: </Typography>
           <Typography className="mb-3">_______________________</Typography>

           </div>
           <div>
           <Typography className="mb-3" fontWeight={theme.typography.fontWeightBold}>Checked by: </Typography>
           <Typography className="mb-3">_______________________</Typography>
            
           </div>

           <div>
           <Typography className="mb-3" fontWeight={theme.typography.fontWeightBold}>Received by: </Typography>
           <Typography className="mb-3">_______________________</Typography>
            
           </div>

           </div>

               
            
                       
        </div>
    );


})

export default PrintDesignA4;