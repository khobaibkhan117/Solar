import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Colors from '../../utils/colors'
import useStyles from "./bank-jss";
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
import { deleteCustomer, getAllCustomerPaginate } from "../../services/customer.service";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import { deletebank, getAllBankPaginate } from "../../services/bank.service";
import AddBank from "./AddBank";
import EditBank from "./EditBank";


const BankListing = () => {
  const theme = useTheme();
  const { classes, cx } = useStyles()
  const [addBankModal, setAddBankModal] = useState(false)
  const [editBankModal, setEditBankModal] = useState(false)
  const [viewBankModal, setViewBankModal] = useState(false)
  const [deleteBankModal, setDeleteBankModal] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const email = sessionStorage.getItem("email")
  const [loading, setLoading] = useState(false)
  const [selectedBank,setSelectedBank] = useState({})
  const [deleteLoading,setDeleteLoading] = useState(false)
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const [searchName,setSearchName] = useState("")

  useEffect(() => {

    getBankData(1)

  }, [refreshData])

  const getBankData = async (page_number) => {
    try {
      setLoading(true)
      const response = await getAllBankPaginate(email, "10", page_number,searchName)
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
            if (addBankModal) {
              setAddBankModal(false)
            } else if (editBankModal) {
              setEditBankModal(false)
            } else if (viewBankModal) {
              setViewBankModal(false)
            }else if(deleteBankModal)
            {
              setDeleteBankModal(false)
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
    await getBankData(page);
  };

  const BankDelete = async()=>{
    try{
      setDeleteLoading(true)
      const response = await deletebank(email,selectedBank?._id)
      if(response?.data?.status == 200)
      {
        showAlert(response.data.message,"success")
       setRefreshData(!refreshData)
       setDeleteBankModal(false)
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

      {/* Add Bank  */}
      <Dialog
        open={addBankModal}
        maxWidth="xs"
        fullWidth
        onClose={() => setAddBankModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add Bank</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddBank setAddBankModal={setAddBankModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* View Bank  */}
      <Dialog
        open={viewBankModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setViewBankModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>View Bank</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          {/* <ViewCustomer data={selectedBank} /> */}

        </DialogContent>
      </Dialog>

      {/* View Bank  */}
      <Dialog
        open={editBankModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setEditBankModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Edit Bank</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <EditBank data={selectedBank} setEditBankModal={setEditBankModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* Delete Product */}
      <Dialog
        open={deleteBankModal}
        maxWidth="sm"
        fullWidth

        onClose={() => {
          if(!deleteLoading)
          {
            setDeleteBankModal(false)
          }
        }}
      >
        <BootstrapDialogTitle>Delete Bank</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want Delete this Bank?

        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button variant="contained" disabled={deleteLoading} size="small" sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }} onClick={()=>BankDelete()} >Yes</Button>
          <Button variant="outlined"  disabled={deleteLoading} size="small" sx={{ borderColor: "#29B3FD" }} onClick={()=>{
            setSelectedBank({})
            setDeleteBankModal(false)

          }} >No</Button>

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
            getBankData(1)
          }}
         
        >
          Filter <FilterAltOutlinedIcon sx={{fontSize:'20px'}} />
        </Button>
        <Button variant="outlined" size="small"
          sx={{ color: "#29B3FD", borderColor: "#29B3FD", borderRadius: '10px', backgroundColor:"#D6F0FE", minWidth:'75px' }}
          onClick={() => setAddBankModal(true)}
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
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                  Bank Name
                </TableCell>
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                  Account Title
                </TableCell>
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                   Account No
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
                      <TableCell style={{wordBreak:"normal"}} >{item.bank_name}</TableCell>
                      <TableCell style={{wordBreak:"normal"}} >{item.account_title}</TableCell>
                      <TableCell >
                        {item?.account_no}
                      </TableCell>
                      <TableCell>
                        <div className=" flex ">
                        <Tooltip title="Edit Bank">
                          <IconButton onClick={()=>{
                            setSelectedBank(item)
                            setEditBankModal(true)

                          }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Bank">
                          <IconButton onClick={()=>{
                            setSelectedBank(item)
                            setDeleteBankModal(true)

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


export default BankListing