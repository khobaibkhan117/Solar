import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Colors from '../../utils/colors'
import useStyles from "./User-jss";
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
  Switch,
  TextField,
  useMediaQuery
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";
import { getAllUserPaginate, updateUserStatus } from "../../services/auth.service";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';


const UserListing = () => {
  const theme = useTheme();
  const product_of= sessionStorage.getItem("product_of") || ""
  const product_of_id= sessionStorage.getItem("product_of_id") || ""
  const { classes, cx } = useStyles()
  const [addUserModal, setAddUserModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [viewUserModal, setViewUserModal] = useState(false)
  const [updateStatusUserModal, setUpdateStatusUserModal] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const email = sessionStorage.getItem("email")
  const [loading, setLoading] = useState(false)
  const [selectedUser,setSelectedUser] = useState({})
  const [updateStatusLoading,setUpdateStatusLoading] = useState(false)
  const [searchName,setSearchName] = useState("")

  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {

    getUserData(1)

  }, [refreshData])

  const getUserData = async (page_number) => {
    try {
      setLoading(true)
      const response = await getAllUserPaginate(email, "10", page_number,product_of_id, searchName)
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
            if (addUserModal) {
              setAddUserModal(false)
            } else if (editUserModal) {
              setEditUserModal(false)
            } else if (viewUserModal) {
              setViewUserModal(false)
            }else if(updateStatusUserModal)
            {
              setUpdateStatusUserModal(false)
            }

          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
          disabled={updateStatusLoading}


        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };

  const handlePaginationChange = async (event, page) => {
    await getUserData(page);
  };

  const statusUserUpdate = async()=>{
    try{
        setUpdateStatusLoading(true)
      const response = await updateUserStatus(email,selectedUser._id, !selectedUser.status)
      if(response?.data?.status == 200)
      {
        showAlert(response.data.message,"success")
       setRefreshData(!refreshData)
       setUpdateStatusUserModal(false)
       setUpdateStatusLoading(false)
      }else{
        setUpdateStatusLoading(false)
        showAlert(response.data.message,"error")
       
      }

    }catch(err)
    {
        setUpdateStatusLoading(false)
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
    <div className=" items-center">

      {/* Add User  */}
      <Dialog
        open={addUserModal}
        maxWidth="md"
        fullWidth
        // fullScreen
        onClose={() => setAddUserModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add User</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddUser setAddUserModal={setAddUserModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* View User  */}
      <Dialog
        open={viewUserModal}
        maxWidth="md"
        fullWidth
        // fullScreen
        onClose={() => setViewUserModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>View User</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <ViewUser data={selectedUser} />

        </DialogContent>
      </Dialog>

      {/* Edit User  */}
      <Dialog
        open={editUserModal}
        maxWidth="md"
        fullWidth
        // fullScreen
        onClose={() => setEditUserModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Edit User</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <EditUser data={selectedUser} setEditUserModal={setEditUserModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* Update  User */}
      <Dialog
        open={updateStatusUserModal}
        maxWidth="sm"
        fullWidth

        onClose={() => {
          if(!updateStatusLoading)
          {
            setUpdateStatusUserModal(false)
          }
        }}
      >
        <BootstrapDialogTitle>Update Status User</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want {selectedUser.status == true ? "Deactive" : "Active"} this User?

        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button variant="contained" disabled={updateStatusLoading} size="small" sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }} onClick={()=>{statusUserUpdate()}} >Yes</Button>
          <Button variant="outlined"  disabled={updateStatusLoading} size="small" sx={{ borderColor: "#29B3FD" }} onClick={()=>{
            setSelectedUser({})
            setUpdateStatusUserModal(false)

          }} >No</Button>

        </DialogActions>
      </Dialog>

      <div className="grid grid-cols-8  lg:ps-40   pl-6 pr-8 gap-x-2 mb-5">
      <div className="col-span-4 md:col-span-6">
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
            getUserData(1)
          }}
         
        >
          Filter <FilterAltOutlinedIcon sx={{fontSize:'20px'}} />
        </Button>
        <Button variant="outlined" size="small"
          sx={{ color: "#29B3FD", borderColor: "#29B3FD", borderRadius: '10px', backgroundColor:"#D6F0FE", minWidth:'75px' }}
          onClick={() => setAddUserModal(true)}
        >
          Add <AddIcon  sx={{fontSize:'20px'}} />
        </Button>
      </div>
      

            </div>



          <div className="flex justify-center">
 
      <Paper className="mx-3 "  sx={{ minHeight: "50vh",width:mdDown ? "90%" :"70%"   }} elevation={15}>
       

        {loading ? <Loading /> : <TableContainer sx={{ overflow: "auto" }}>
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
                  Email
                </TableCell>
                <TableCell
                  style={{
                    color: Colors.customer.headColor,
                  }}
                  
                >
                  Contact No.
                </TableCell>
                <TableCell >
                  Status
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
                        setSelectedUser(item)
                        setViewUserModal(true)
                      }} className=" cursor-pointer" sx={{ width: 60, height: 60, fontSize: "2rem" }} src={item.profile_picture ? item.profile_picture : ""}>{item.profile_picture ? "" : item.name?.slice(0,2)?.toUpperCase()}</Avatar></TableCell>
                      <TableCell style={{wordBreak:"normal"}} >{item.name}</TableCell>
                      <TableCell style={{wordBreak:"normal"}} >{item.email}</TableCell>
                      <TableCell >
                        {item?.contact_no}
                      </TableCell>
                      <TableCell>
                      <Tooltip title="User Status">
                        <Switch
                        checked={item.status}
                        onChange={()=>{
                          setSelectedUser(item)
                            setUpdateStatusUserModal(true)

                        }}
                         />
                         </Tooltip>
                      </TableCell>
                      <TableCell>
                        <div className=" flex ">
                        <Tooltip title="Edit User">
                          <IconButton onClick={()=>{
                            setSelectedUser(item)
                            setEditUserModal(true)

                          }}>
                            <EditIcon />
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


export default UserListing