import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Colors from '../../utils/colors'
import useStyles from "./productOf-jss";
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
  DialogActions
} from "@mui/material";

import { useSnackbar } from 'notistack'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteproductOf, getAllproductOfPaginate } from "../../services/productOf.service";
import AddProductOf from "./AddProductOf";
import ViewProductOf from "./ViewProductOf";
import EditProductOf from "./EditProductOf";
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";


const ProductOfListing = () => {
  const theme = useTheme();
  const { classes, cx } = useStyles()
  const { enqueueSnackbar } = useSnackbar();
  const [addProductOfModal, setAddProductOfModal] = useState(false)
  const [editProductOfModal, setEditProductOfModal] = useState(false)
  const [viewProductOfModal, setViewProductOfModal] = useState(false)
  const [deleteProductOfModal, setDeleteProductOfModal] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const email = sessionStorage.getItem("email")
  const [loading, setLoading] = useState(false)
  const [selectedProductOf, setSelectedProductOf] = useState({})
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {

    getProductOfData(1)

  }, [refreshData])

  const getProductOfData = async (page_number) => {
    try {
      setLoading(true)
      const response = await getAllproductOfPaginate(email, "10", page_number)
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
            if (addProductOfModal) {
              setAddProductOfModal(false)
            } else if (editProductOfModal) {
              setEditProductOfModal(false)
            } else if (viewProductOfModal) {
              setViewProductOfModal(false)
            } else if (deleteProductOfModal) {
              setDeleteProductOfModal(false)
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
    await getProductOfData(page);
  };

  const ProductOfDelete = async () => {
    try {
      setDeleteLoading(true)
      const response = await deleteproductOf(email, selectedProductOf?._id)
      if (response?.data?.status == 200) {
        showAlert(response.data.message, "success")
        setRefreshData(!refreshData)
        setDeleteProductOfModal(false)
        setDeleteLoading(false)
      } else {
        setDeleteLoading(false)
        showAlert(response.data.message, "error")

      }

    } catch (err) {
      setDeleteLoading(false)
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
    <div >

      {/* Add ProductOf */}
      <Dialog
        open={addProductOfModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setAddProductOfModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add Other Companies</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddProductOf setAddProductOfModal={setAddProductOfModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* View ProductOf  */}
      <Dialog
        open={viewProductOfModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setViewProductOfModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>View Other Companies</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <ViewProductOf data={selectedProductOf} />

        </DialogContent>
      </Dialog>

      {/* Edit ProductOf */}
      <Dialog
        open={editProductOfModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setEditProductOfModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Edit Other Companies</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <EditProductOf data={selectedProductOf} setEditProductOfModal={setEditProductOfModal} refreshData={refreshData} setRefreshData={setRefreshData} />

        </DialogContent>
      </Dialog>

      {/* Delete ProductOf */}
      <Dialog
        open={deleteProductOfModal}
        maxWidth="sm"
        fullWidth

        onClose={() => {
          if (!deleteLoading) {
            setDeleteProductOfModal(false)
          }
        }}
      >
        <BootstrapDialogTitle>Delete Other Companies</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want Delete this ProductOf?

        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button variant="contained" disabled={deleteLoading} size="small" sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }} onClick={() => ProductOfDelete()} >Yes</Button>
          <Button variant="outlined" disabled={deleteLoading} size="small" sx={{ borderColor: "#29B3FD" }} onClick={() => {
            setSelectedProductOf({})
            setDeleteProductOfModal(false)

          }} >No</Button>

        </DialogActions>
      </Dialog>

      <Paper className="mx-2 md:mx-28" style={{ minHeight: "50vh" }} elevation={15}>
        <div className="flex justify-end mb-0 mr-2">
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: Colors.customer.buttonColor }}
            className="mt-1"
            onClick={() => setAddProductOfModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 30 30"
            >
              <path
                fill="white"
                d="M14.97 2.973A2 2 0 0013 5v8H5a2 2 0 100 4h8v8a2 2 0 104 0v-8h8a2 2 0 100-4h-8V5a2 2 0 00-2.03-2.027z"
              ></path>
            </svg>
            <span style={{ marginLeft: "5px" }}>Add</span>
          </Button>
        </div>

        {loading ? <Loading />
          : <TableContainer sx={{ overflow: "auto" }}>
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
                        <TableCell ><Avatar onClick={() => {
                          setSelectedProductOf(item)
                          setViewProductOfModal(true)
                        }} className=" cursor-pointer" sx={{ width: 60, height: 60, fontSize: "2rem" }} src={item.profile_picture ? item.profile_picture : ""}>{item.profile_picture ? "" : item.name?.slice(0, 2)?.toUpperCase()}</Avatar></TableCell>
                        <TableCell style={{ wordBreak: "normal" }} >{item.name}</TableCell>
                        <TableCell style={{ wordBreak: "normal" }} >{item.cnic}</TableCell>
                        <TableCell >
                          {item?.contact_no}
                        </TableCell>
                        <TableCell>
                          <div className=" flex ">
                            <Tooltip title="Edit Customer">
                              <IconButton onClick={() => {
                                setSelectedProductOf(item)
                                setEditProductOfModal(true)

                              }}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Customer">
                              <IconButton onClick={() => {
                                setSelectedProductOf(item)
                                setDeleteProductOfModal(true)

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
  )
}


export default ProductOfListing