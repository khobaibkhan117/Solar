import React,{useEffect,useState} from 'react';
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";
import { useTheme } from "@mui/material/styles";
import Colors from '../../utils/colors'
import useStyles from "./paymentRecovery-jss";
import {
  Button,
  Paper,
  Table,
  TableContainer,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  Hidden,
  IconButton,
  Pagination,
  Avatar,
  TableBody,
  Tooltip,
  DialogActions,
  useMediaQuery,
  TextField
} from "@mui/material";
import { getAllCustomerPendingPayments, updatePendingBalance } from '../../services/paymentRecovery.service';
import DoneIcon from '@mui/icons-material/Done';

const PaymentRecovery=()=> {
    const theme = useTheme();
    const { classes, cx } = useStyles()
    const [refreshData, setRefreshData] = useState(false)
    const [data, setData] = useState([])

    const email = sessionStorage.getItem("email")
    const [loading, setLoading] = useState(false)
    const [amountPay,setAmountPay] = useState([])
    const mdDown = useMediaQuery(theme.breakpoints.down("md"))
    const [updateBalanceLoading,setUpdateBalanceLoading] = useState([])

    // Return the function name

    useEffect(() => {

        getData()
    
      }, [refreshData])
    
      const getData = async () => {
        try {
          setLoading(true)
          const response = await getAllCustomerPendingPayments(email)
          if (response?.data?.status == 200) {
            setData(response.data.data)
            
            setLoading(false)
          } else {
            setData([])
            showAlert(response.data.message, "error")
            setLoading(false)
          }
    
        } catch (err) {
          setLoading(false);
          setData([])
          if (err.response) {
            showAlert(err.response.data.message?.toString(), "error");
          } else if (err.message) {
            showAlert(err.message, "error");
          } else if (err) {
            showAlert(err, "error");
          }
    
        }
      }

      const updateBalance = async (_id,index) => {
        try {
          updateBalanceLoading[index] = true
          setUpdateBalanceLoading([...updateBalanceLoading])
          const response = await updatePendingBalance(email,_id,+(-amountPay[index]),"Received" )
          if (response?.data?.status == 200) {
            setRefreshData(!refreshData)
            updateBalanceLoading[index] = false
            setUpdateBalanceLoading([...updateBalanceLoading])
            setAmountPay([])
          } else {
            
            showAlert(response.data.message, "error")
            updateBalanceLoading[index] = false
            setUpdateBalanceLoading([...updateBalanceLoading])
          }
    
        } catch (err) {
            updateBalanceLoading[index] = false
            setUpdateBalanceLoading([...updateBalanceLoading])
          if (err.response) {
            showAlert(err.response.data.message?.toString(), "error");
          } else if (err.message) {
            showAlert(err.message, "error");
          } else if (err) {
            showAlert(err, "error");
          }
    
        }
      }


    return (
        <div>
             <div className="flex justify-center">
     
     <Paper className="mx-3 "  sx={{ minHeight: "50vh",width:mdDown ? "90%" :"70%"   }} elevation={24}>
     

       {loading ? 
       <Loading /> :
        <TableContainer sx={{ overflow: "auto" }}>
         <Table className={cx(classes.table, classes.hover)}>
           <TableHead>
             <TableRow>
               <TableCell
                 
                 align="left"
                 sx={{ width: "1%" }}
               >

               </TableCell>
               <TableCell
                 style={{
                   color: Colors.customer.headColor,
                 }}
                 
               >
                 Name
               </TableCell>
               
               <TableCell
                 style={{
                   color: Colors.customer.headColor,
                 }}
                 
               >
                 Contact No.
               </TableCell>

               <TableCell
                 style={{
                   color: Colors.customer.headColor,
                 }}
                 
               >
                 Balance
               </TableCell>

               <TableCell
                 style={{
                   color: Colors.customer.headColor,
                 }}
                 
               >
                 Receive  Amount
               </TableCell>


               <TableCell
                 style={{
                   color: Colors.customer.headColor,
                 }}
                 sx={{ width: "7%" }}
                 align="center"
               >
                 Action
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {data?.map((item, index) => {
               return (
                 <>
                   <TableRow key={item._id}>
                     <TableCell ><Avatar  className=" cursor-pointer" sx={{ width: 60, height: 60, fontSize: "2rem" }} src={item.profile_picture ? item.profile_picture : ""}>{item.profile_picture ? "" : item.name?.slice(0,2)?.toUpperCase()}</Avatar></TableCell>
                     <TableCell style={{wordBreak:"normal"}} >{item.name}</TableCell>
                     <TableCell >
                       {item?.contact_no}
                     </TableCell>
                     <TableCell>
                       {item?.balance || 0}
                     </TableCell>

                     <TableCell >
                        <TextField  
                        size="small"   
                        value={amountPay[index] || ""}
                        inputProps={{readOnly:updateBalanceLoading[index], inputMode:"numeric"}}
                        
                        onChange={(e)=>{
                            amountPay[index] = e.target.value?.replace(/[^0-9]/gi, "")
                          setAmountPay([...amountPay])

                        }}
                        sx={{width:'100px', color: Colors.customer.textFieldColor, borderColor: Colors.customer.borderColor }}/>
                      </TableCell>
                     <TableCell>
                     <IconButton disabled ={ updateBalanceLoading[index] || !amountPay[index]}
                     onClick={()=>{
                        updateBalance(item._id,index )

                     }}>
                        <DoneIcon />
                     </IconButton>
                      
                     </TableCell>
                   
                   </TableRow>
                 </>
               );
             })}
           </TableBody>

         </Table>

       </TableContainer>}

       

     </Paper>
     </div>
        </div>
    );
}

export default PaymentRecovery