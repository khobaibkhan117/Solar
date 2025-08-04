import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Colors from '../../utils/colors'
import useStyles from "./customer-jss";
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
import AddCustomer from "./AddCustomer";
import { deleteCustomer, getAllCustomerPaginate } from "../../services/customer.service";
import { useSnackbar } from 'notistack'
import ViewCustomer from "./ViewCustomer";
import EditIcon from '@mui/icons-material/Edit';
import EditCustomer from "./EditCustomer";
import DeleteIcon from '@mui/icons-material/Delete';
import BGImage from '../../images/productlistbg.png'
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import moment from "moment";


const CustomerListing = () => {
  const theme = useTheme();
  const { classes, cx } = useStyles()
  const [addCustomerModal, setAddCustomerModal] = useState(false)
  const [editCustomerModal, setEditCustomerModal] = useState(false)
  const [viewCustomerModal, setViewCustomerModal] = useState(false)
  const [deleteCustomerModal, setDeleteCustomerModal] = useState(false)
  const [paymentHistoryModal, setPaymentHistoryModal] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const email = sessionStorage.getItem("email")
  const [loading, setLoading] = useState(false)
  const [selectedCustomer,setSelectedCustomer] = useState({})
  const [deleteLoading,setDeleteLoading] = useState(false)
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const [searchName,setSearchName] = useState("")

  useEffect(() => {

    getCustomerData(1)

  }, [refreshData])

  const getCustomerData = async (page_number) => {
    try {
      setLoading(true)
      const response = await getAllCustomerPaginate(email, "10", page_number,searchName)
      if (response?.data?.status == 200) {
        setPageNumber(page_number)
        setData(response.data.data)
        setTotalPages(response.data.totalPages);
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

 

  const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
        <Hidden mdDown>
          <img className="position-absolute" src={require("../../images/logo.png")} style={{ width: '50px', height: "50px", backgroundSize: 'cover' }} />

        </Hidden>
        <Typography textAlign="center" fontWeight={theme.typography.fontWeightBold} sx={{ color: Colors.customer.headColor, fontSize: "2.5rem" }}>  {children} </Typography>


        <IconButton
          onClick={() => {
            if (addCustomerModal) {
              setAddCustomerModal(false)
            } else if (editCustomerModal) {
              setEditCustomerModal(false)
            } else if (viewCustomerModal) {
              setViewCustomerModal(false)
            }else if(deleteCustomerModal)
            {
              setDeleteCustomerModal(false)
            }else if(paymentHistoryModal)
            {
              setPaymentHistoryModal(false)
            }

          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
          disabled={deleteLoading}


        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };

  const handlePaginationChange = async (event, page) => {
    await getCustomerData(page);
  };

  const customerDelete = async()=>{
    try{
      setDeleteLoading(true)
      const response = await deleteCustomer(email,selectedCustomer?._id)
      if(response?.data?.status == 200)
      {
        showAlert(response.data.message,"success")
       setRefreshData(!refreshData)
       setDeleteCustomerModal(false)
       setDeleteLoading(false)
      }else{
        setDeleteLoading(false)
        showAlert(response.data.message,"error")
       
      }

    }catch(err)
    {
      setDeleteLoading(false)
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
    <div >

      {/* Add Customer  */}
      <Dialog
        open={addCustomerModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setAddCustomerModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add Customer</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddCustomer setAddCustomerModal={setAddCustomerModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* View Customer  */}
      <Dialog
        open={viewCustomerModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setViewCustomerModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>View Customer</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <ViewCustomer data={selectedCustomer} />

        </DialogContent>
      </Dialog>

      {/* View Customer  */}
      <Dialog
        open={editCustomerModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setEditCustomerModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Edit Customer</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <EditCustomer data={selectedCustomer} setEditCustomerModal={setEditCustomerModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* Delete Customer */}
      <Dialog
        open={deleteCustomerModal}
        maxWidth="sm"
        fullWidth

        onClose={() => {
          if(!deleteLoading)
          {
            setDeleteCustomerModal(false)
          }
        }}
      >
        <BootstrapDialogTitle>Delete Customer</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want Delete this Customer?

        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button variant="contained" disabled={deleteLoading} size="small" sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }} onClick={()=>customerDelete()} >Yes</Button>
          <Button variant="outlined"  disabled={deleteLoading} size="small" sx={{ borderColor: "#29B3FD" }} onClick={()=>{
            setSelectedCustomer({})
            setDeleteCustomerModal(false)

          }} >No</Button>

        </DialogActions>
      </Dialog>

      {/* Payment History Modal  */}
      <Dialog
        open={paymentHistoryModal}
        maxWidth="sm"
        fullWidth

        onClose={() => {
          setPaymentHistoryModal(false)
        }}
      >
        <BootstrapDialogTitle>Payment History</BootstrapDialogTitle>
        <DialogContent className="pt-2">
        <TableContainer sx={{ overflow: "auto" }}>
          <Table className={cx(classes.table, classes.hover)}>
            <TableHead>
              <TableRow>
               
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                  Date
                </TableCell>
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                  Updated By
                </TableCell>
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                 Type
                </TableCell>
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                  Amount
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
                  Invoice ID
                </TableCell>


               
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCustomer?.payment_history?.map((item, index) => {
                return (
                  <>
                    <TableRow key={item._id}>
                      <TableCell style={{wordBreak:"normal"}} >{item.time ? moment(item.time).format("DD-MMM-YYYY") : item.date}</TableCell>
                      <TableCell style={{wordBreak:"normal"}} >{item.email}</TableCell>
                      <TableCell >
                        {item?.type}
                      </TableCell>
                      <TableCell>
                        {item?.amount || 0}
                      </TableCell>
                      <TableCell>
                        {item?.balance || 0}
                      </TableCell>

                      <TableCell>
                        {item?.invoice_id || ""}
                      </TableCell>
                     
                    
                    </TableRow>
                  </>
                );
              })}
            </TableBody>

          </Table>

        </TableContainer>

        </DialogContent>
        <DialogActions className="justify-content-end">
          <Button variant="contained"  disabled={deleteLoading} size="small" sx={{ borderColor: "#29B3FD" }} onClick={()=>{
            setSelectedCustomer({})
            setPaymentHistoryModal(false)

          }} >Close</Button>

        </DialogActions>
      </Dialog>




      <div className="grid grid-cols-8  lg:ps-40  pl-6 pr-8 gap-x-2 mb-5">
      <div className=" col-span-4 md:col-span-6">
        <TextField 
          placeholder="Search"
          fullWidth
          value={searchName}
          onChange={(e)=>setSearchName(e.target.value)}
          size="small"
          sx={{ color: Colors.products.textFieldCOlor, borderColor: Colors.products.borderColor, backgroundColor:"#D6F0FE" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2  flex gap-x-2" >
      <Button 
        variant="outlined" 
        size="small"
        sx={{ color: "#29B3FD", borderColor: "#29B3FD", borderRadius: '10px', backgroundColor:"#D6F0FE", minWidth:'75px' }}
          onClick={()=>{
            getCustomerData(1)
          }}
         
        >
          Filter <FilterAltOutlinedIcon sx={{fontSize:'20px'}} />
        </Button>
        <Button variant="outlined" size="small"
          sx={{ color: "#29B3FD", borderColor: "#29B3FD", borderRadius: '10px', backgroundColor:"#D6F0FE", minWidth:'75px' }}
          onClick={() => setAddCustomerModal(true)}
        >
          Add <AddIcon  sx={{fontSize:'20px'}} />
        </Button>
      </div>
      

      </div>

   
      
      <div className="flex justify-center">
     
      <Paper className="mx-3 "  sx={{ minHeight: "50vh",width:mdDown ? "90%" :"70%"   }} elevation={24}>
      

        {loading ? <Loading /> :
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
                  CNIC
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
                      <TableCell ><Avatar onClick={()=>{
                        setSelectedCustomer(item)
                        setViewCustomerModal(true)
                      }} className=" cursor-pointer" sx={{ width: 60, height: 60, fontSize: "2rem" }} src={item.profile_picture ? item.profile_picture : ""}>{item.profile_picture ? "" : item.name?.slice(0,2)?.toUpperCase()}</Avatar></TableCell>
                      <TableCell style={{wordBreak:"normal"}} >{item.name}</TableCell>
                      <TableCell style={{wordBreak:"normal"}} >{item.cnic}</TableCell>
                      <TableCell >
                        {item?.contact_no}
                      </TableCell>
                      <TableCell>
                        {item?.balance || 0}
                      </TableCell>
                      <TableCell>
                        <div className=" flex ">
                        <Tooltip title="Payment History">
                          <IconButton 
                          disabled={item?.payment_history?.length == 0 || !item?.payment_history}
                          onClick={()=>{
                            setSelectedCustomer(item)
                            setPaymentHistoryModal(true)

                          }}>
                            <HistoryIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit Customer">
                          <IconButton onClick={()=>{
                            setSelectedCustomer(item)
                            setEditCustomerModal(true)

                          }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Customer">
                          <IconButton onClick={()=>{
                            setSelectedCustomer(item)
                            setDeleteCustomerModal(true)

                          }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        </div>
                      </TableCell>
                    
                    </TableRow>
                  </>
                );
              })}
            </TableBody>

          </Table>

        </TableContainer>}

        {data?.length > 0 && !loading &&
          <div className=" flex justify-center p-2">
            <Pagination
              count={totalPages}
              page={pageNumber}
              variant="outlined"
              color="primary"
              onChange={handlePaginationChange}
            />
          </div>}

      </Paper>
      </div>
   
    </div>
  )
}


export default CustomerListing