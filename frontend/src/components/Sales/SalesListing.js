import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Hidden,
  IconButton,
  ListItemText,
  Pagination,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  TableBody,
  Tooltip,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Colors from "../../utils/colors";
import useStyles from "./sales-jss";
import AddSales from "./AddSales";
import { useSnackbar } from "notistack";
import { getAllSalePaginate, saleDelete } from "../../services/sale.service";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewSales from "./ViewSale";
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const SalesListing = () => {
  const theme = useTheme();
  const email = sessionStorage.getItem("email");
  const { classes, cx } = useStyles();
  const [addSaleModal, setAddSaleModal] = useState(false);
  const [viewSaleModal, setViewSaleModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSale, setSelectedSale] = useState({});
  const [searchInvoiceID, setSearchInvoiceID] = useState("");
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [data, setData] = useState([]);

  const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2, pb: 1 }} {...other}>
        <Hidden mdDown>
          <img
            className="position-absolute"
            src={require("../../images/logo.png")}
            style={{ width: "50px", height: "50px", backgroundSize: "cover" }}
          />
        </Hidden>
        <Typography
          textAlign="center"
          fontWeight={theme.typography.fontWeightBold}
          sx={{ color: Colors.sales.headColor, fontSize: "2.5rem" }}
        >
          {" "}
          {children}{" "}
        </Typography>

        <IconButton
          disabled={deleteLoading}
          onClick={() => {
            if (addSaleModal) {
              setAddSaleModal(false);
            } else if (viewSaleModal) {
              setViewSaleModal(false);
            } else if (deleteModal) {
              setDeleteModal(false);
            }
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };

  useEffect(() => {
    getSaleData(1);
  }, [refreshData]);

  const getSaleData = async (page_number) => {
    try {
      setLoading(true);
      const response = await getAllSalePaginate(
        email,
        "10",
        page_number,
        searchInvoiceID
      );
      if (response?.data?.status == 200) {
        setPageNumber(page_number);
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } else {
        setData([]);
        showAlert(response.data.message, "error");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setData([]);
      if (err.response) {
        showAlert(err.response.data.message?.toString(), "error");
      } else if (err.message) {
        showAlert(err.message, "error");
      } else if (err) {
        showAlert(err, "error");
      }
    }
  };

  const handlePaginationChange = async (event, page) => {
    await getSaleData(page);
  };

  const deleteSale = async () => {
    try {
      setDeleteLoading(true);
      const response = await saleDelete(email, selectedSale?.sale_id);
      if (response?.data?.status == 200) {
        showAlert(response.data.message, "success");
        setRefreshData(!refreshData);
        setDeleteModal(false);
        setDeleteLoading(false);
      } else {
        setDeleteLoading(false);
        showAlert(response.data.message, "error");
      }
    } catch (err) {
      setDeleteLoading(false);
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
    <div>
      {/* Add Sales  */}
      <Dialog
        open={addSaleModal}
        maxWidth="lg"
        fullWidth
        fullScreen
        onClose={() => setAddSaleModal(false)}
        classes={{ paper: classes.addCardBG }}
      >
        <BootstrapDialogTitle>INVOICE</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddSales
            setAddSaleModal={setAddSaleModal}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        </DialogContent>
      </Dialog>

      {/* View Sales  */}
      <Dialog
        open={viewSaleModal}
        maxWidth="lg"
        fullWidth
        fullScreen
        onClose={() => setViewSaleModal(false)}
        classes={{ paper: classes.addCardBG }}
      >
        <BootstrapDialogTitle>INVOICE</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <ViewSales data={selectedSale} />
        </DialogContent>
      </Dialog>

      {/* Delete Sales */}
      <Dialog
        open={deleteModal}
        maxWidth="sm"
        fullWidth
        onClose={() => {
          if (!deleteLoading) {
            setDeleteModal(false);
          }
        }}
      >
        <BootstrapDialogTitle>Delete Sales</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want Delete this Sales?
        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button
            variant="contained"
            disabled={deleteLoading}
            size="small"
            sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }}
            onClick={() => deleteSale()}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            disabled={deleteLoading}
            size="small"
            sx={{ borderColor: "#29B3FD" }}
            onClick={() => {
              setSelectedSale({});
              setDeleteModal(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* <div className="flex justify-center">
        <Typography
          className={" text-center "}
          sx={{ fontSize: "2rem", color: Colors.customer.headColor }}
          fontWeight={theme.typography.fontWeightBold}
        >
          Sales
        </Typography>
      </div> */}

      <div className="grid grid-cols-8  lg:ps-40   pl-6 pr-8 gap-x-2 mb-5">
        <div className=" col-span-4 md:col-span-6">
          <TextField
            placeholder="Search"
            fullWidth
            value={searchInvoiceID}
            onChange={(e) => setSearchInvoiceID(e.target.value)}
            size="small"
            sx={{
              color: Colors.products.textFieldCOlor,
              borderColor: Colors.products.borderColor,
              backgroundColor: "#D6F0FE",
            }}
          />
        </div>
        <div className="col-span-4 md:col-span-2  flex gap-x-2">
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "#29B3FD",
              borderColor: "#29B3FD",
              borderRadius: "10px",
              backgroundColor: "#D6F0FE",
              minWidth: "75px",
            }}
            onClick={() => {
              getSaleData(1);
            }}
          >
            Filter <FilterAltOutlinedIcon sx={{ fontSize: "20px" }} />
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "#29B3FD",
              borderColor: "#29B3FD",
              borderRadius: "10px",
              backgroundColor: "#D6F0FE",
              minWidth: "75px",
            }}
            onClick={() => setAddSaleModal(true)}
          >
            Add <AddIcon sx={{ fontSize: "20px" }} />
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <Paper
          className="mx-3 "
          sx={{ minHeight: "50vh", width: mdDown ? "90%" : "70%" }}
          elevation={24}
        >
          {/* <div className="flex justify-end mb-0 mr-2">
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: Colors.sales.buttonColor }}
            className="mt-1"
            onClick={() => setAddSaleModal(true)}
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
        </div> */}

          {loading ? (
            <Loading />
          ) : (
            <TableContainer sx={{ overflow: "auto" }}>
              <Table className={cx(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        color: Colors.sales.headColor,
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.sales.headColor,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.sales.headColor,
                      }}
                    >
                      Vehicle No
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.sales.headColor,
                      }}
                    >
                      Payment Type
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.sales.headColor,
                      }}
                    >
                      Total
                    </TableCell>

                    <TableCell
                      style={{
                        color: Colors.sales.headColor,
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
                          <TableCell>{item.sale_id}</TableCell>
                          <TableCell style={{ wordBreak: "normal" }}>
                            {item.customer_name}
                          </TableCell>
                          <TableCell style={{ wordBreak: "normal" }}>
                            {item.vehicle_number}
                          </TableCell>
                          <TableCell>{item?.payment_method}</TableCell>
                          <TableCell>{`Rs${item?.total}`}</TableCell>
                          <TableCell>
                            <div className=" flex ">
                              <Tooltip title="View Sale">
                                <IconButton
                                  onClick={() => {
                                    setSelectedSale(item);
                                    setViewSaleModal(true);
                                  }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Sale">
                                <IconButton
                                  onClick={() => {
                                    setSelectedSale(item);
                                    setDeleteModal(true);
                                  }}
                                >
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
            </TableContainer>
          )}

          {data?.length > 0 && !loading && (
            <div className=" flex justify-center p-2">
              <Pagination
                count={totalPages}
                page={pageNumber}
                variant="outlined"
                color="primary"
                onChange={handlePaginationChange}
              />
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default SalesListing;
