import { Table, TableHead, TableRow, TableCell, TableBody,  Typography, TableContainer, Paper, TableFooter } from "@mui/material";
import React, {forwardRef} from "react";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import "../../styles/sales.css";
import { decimalNumber, numberWithCommas } from "../../utils/customsFunctions";



const PrintDesign = forwardRef((props,ref) => {
    const theme = useTheme();
    const {data,customerData} = props;

    const getRow = (dataArray) =>
        dataArray.map((data, index) => (
            <TableRow key={index.toString()} >
                <TableCell sx={{borderBottom:"1px solid #000"}} className="item-name" >
                    {index + 1}
                </TableCell>
                <TableCell sx={{borderBottom:"1px solid #000"}} className="description">
                    <span>{data.name}</span>
                </TableCell>
                <TableCell sx={{borderBottom:"1px solid #000"}}  align="right" className="textAlign">
                    <span>{numberWithCommas(data.qty)}</span>
                </TableCell>
                <TableCell sx={{borderBottom:"1px solid #000"}}  align="right" className="textAlign">
                    <span>{data.price}</span>
                </TableCell>
                <TableCell sx={{borderBottom:"1px solid #000"}} align="right" className="textAlign">
                    {numberWithCommas(
                        decimalNumber(data.qty * data.price * data.watt, 2) - data.discount
                    )}
                </TableCell>
            </TableRow>
        ));
    return (
        <div ref={ref}>
        <div className=" text-center pb-3" style={{borderBottom:'1px solid #000'}}>
           <h1>SolarOne</h1>
           </div>
             
              <Typography fontWeight={theme.typography.fontWeightBold} textAlign="center" sx={{borderBottom:'1px solid #000', borderTop:'1px solid #000'}}>
             SALES INVOICE
              </Typography>

              <div className="grid  grid-cols-2 mt-4">
              <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                Date: <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{moment(data.creation_time).format("DD-MM-YYYY")}</Typography>
              </Typography>

              </div>
              <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                Bill No: <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{data.sale_id}</Typography>
              </Typography>

              </div>
              <div className=" col-span-2 mt-2">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                Client Name: <Typography component="span" fontWeight={theme.typography.fontWeightRegular}>{data.customer_name}</Typography>
              </Typography>

              </div>

              </div>

       
              
            <Table  sx={{borderTop:"1px solid #000",borderBottom:"1px solid #000"}} size="small">
                <TableHead >
                    <TableRow >
                        <TableCell sx={{borderBottom:"1px solid #000", fontWeight:'bold'}}  className="textAlign">S.N</TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000",fontWeight:'bold'}} className="textAlign">ITEM</TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">QTY</TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">PRICE</TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000",fontWeight:'bold'}} align="right" className="textAlign">AMOUNT</TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>{getRow(data.sale_details)}</TableBody>
                <TableFooter >
                    <TableRow>
                        <TableCell sx={{borderBottom:"1px solid #000"}} align="right" colSpan={3}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>Grand Total:</Typography></TableCell>
                        <TableCell sx={{borderBottom:"1px solid #000"}} align="right" colSpan={2}><Typography color="#000" fontWeight={theme.typography.fontWeightBold}>{numberWithCommas(data.total || 0)}</Typography></TableCell>

                    </TableRow>
                </TableFooter>
                </Table>

                <div className="grid  grid-cols-2 mt-4">
                <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                TOTAL: 
              </Typography>

              </div>
              <div className="text-right">
              <Typography >
                {numberWithCommas(data.total || 0)}
              </Typography>

              </div>

                </div>

                <div className="grid  grid-cols-2" style={{borderBottom:"1px solid #000"}}>
                <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                CASH Received: 
              </Typography>

              </div>


              <div className="text-right">
              <Typography >
                {numberWithCommas((data.total || 0) - (data.remaining_amount || 0))}
              </Typography>

              </div>

            </div>


           {data.remaining_amount && data.remaining_amount != 0 &&
            <div style={{borderTop:"1px solid #000",borderBottom:"1px solid #000"}} className="mt-1" >
         
            <div className="grid  grid-cols-2" >
                <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                Previous Balance: 
              </Typography>

              </div>
              <div className="text-right">
              <Typography >
                {numberWithCommas((customerData?.payment_history?.find(item=>item.invoice_id == data.sale_id)?.balance || 0) -(data.remaining_amount || 0))}
              </Typography>

              </div>

            </div>

            <div className="grid  grid-cols-2" >
                <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                This Bill's rem: 
              </Typography>

              </div>
              <div className="text-right">
              <Typography >
                {numberWithCommas((data.remaining_amount || 0))}
              </Typography>

              </div>

            </div>

            <div className="grid  grid-cols-2">
                <div className="">
              <Typography fontWeight={theme.typography.fontWeightBold}>
                Current Balance: 
              </Typography>

              </div>
              <div className="text-right">
              <Typography >
                {numberWithCommas((customerData?.payment_history?.find(item=>item.invoice_id == data.sale_id)?.balance || 0))}
              </Typography>

              </div>

            </div>

            </div>}

            <Typography fontWeight={theme.typography.fontWeightBold} className="mt-1"
             sx={{borderTop:"1px solid #000",borderBottom:"1px solid #000"}} >
              NOTE : 
              <Typography>
                &nbsp;
              </Typography>
              </Typography>


            <Typography fontWeight={theme.typography.fontWeightBold} className="mb-3">
              Thank You.
              </Typography>

               <Typography className="mb-3"  >
                * Goods once sold will not be returned. <br />
                * Check all equipment before leaving warehouse. <br />
                * Company is not responsible for any damage to solar panels outside warehouse. <br />
                * All transportation is at client end, SolarOne is not responsible for any Transportation handling.
              </Typography>

              <Typography className="mb-3">
                Prepared by : Faizan Ali <br />
                Checked by : Engr Munawar
              </Typography>

               <Typography textAlign="center" className="mb-3">
              Warehouse 1, Adjacent to N-5 metro station, Srinagar highway, G-14/1 <br />
               +92-305-9719992
              </Typography>
                                     
        </div>
    );


})

export default PrintDesign;