import React, { useState, useEffect, useRef } from "react";
import BGImage from "../../images/productlistbg.png";
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
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Colors from "../../utils/colors";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./inventory-jss";
import { useSnackbar } from "notistack";
import AddInventory from "./AddInventory";
import PrintInventoryTable from "./PrintInventoryTable";
import { useReactToPrint } from "react-to-print";
import {
  deleteInventory,
  getAllInventoryPaginate,
  getAllInventoryReport,
  updateInventoryQuantity,
} from "../../services/inventory.service";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const InventoryListing = () => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState("");
  const email = sessionStorage.getItem("email");
  const product_of_id = sessionStorage.getItem("product_of_id") || "";
  const { classes, cx } = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [addInventoryModal, setAddInventoryModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [textFieldData, setTextFieldData] = useState([]);
  const [textFieldDamageData, setTextFieldDamageData] = useState([]);
  const [updateQuantityLoading, setUpdateQuantityLoading] = useState([]);
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedItem, setSelectedItem] = useState({});
  const [deleteInventoryModal, setDeleteInventoryModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [printModal, setPrintModal] = useState(false);
  const printRef = useRef();

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
          sx={{ color: Colors.inventory.headColor, fontSize: "2.5rem" }}
        >
          {" "}
          {children}{" "}
        </Typography>

        <IconButton
          onClick={() => {
            if (addInventoryModal) {
              setAddInventoryModal(false);
            } else if (deleteInventoryModal) {
              setDeleteInventoryModal(false);
            } else if (printModal) {
              setPrintModal(false);
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
    getInventoryData(1);
    setTextFieldData([]);
    setTextFieldDamageData([]);
  }, [refreshData]);

  const getInventoryData = async (page_number) => {
    try {
      setLoading(true);
      const response = await getAllInventoryPaginate(
        email,
        "10",
        page_number,
        product_of_id,
        searchName
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

  const getInventoryReport = async (page_number) => {
    try {
      const response = await getAllInventoryReport(
        email,
        product_of_id,
        searchName
      );
      if (response?.data?.status == 200) {
        setReportData(response.data.data);
        setLoading(false);
      } else {
        setReportData([]);
        showAlert(response.data.message, "error");
        setLoading(false);
      }
    } catch (err) {
      setReportData([]);
    }
  };

  const handlePaginationChange = async (event, page) => {
    setTextFieldData([]);
    await getInventoryData(page);
  };

  const updateQuantity = async (_id, index) => {
    try {
      updateQuantityLoading[index] = true;
      setUpdateQuantityLoading([...updateQuantityLoading]);
      const response = await updateInventoryQuantity(
        email,
        _id,
        +textFieldData[index] || 0,
        +textFieldDamageData[index] || 0
      );
      if (response?.data?.status == 200) {
        setRefreshData(!refreshData);
        updateQuantityLoading[index] = false;
        setUpdateQuantityLoading([...updateQuantityLoading]);
      } else {
        showAlert(response.data.message, "error");
        updateQuantityLoading[index] = false;
        setUpdateQuantityLoading([...updateQuantityLoading]);
      }
    } catch (err) {
      updateQuantityLoading[index] = false;
      setUpdateQuantityLoading([...updateQuantityLoading]);
      if (err.response) {
        showAlert(err.response.data.message?.toString(), "error");
      } else if (err.message) {
        showAlert(err.message, "error");
      } else if (err) {
        showAlert(err, "error");
      }
    }
  };

  const inventoryDelete = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteInventory(email, selectedItem?._id);
      if (response?.data?.status == 200) {
        showAlert(response.data.message, "success");
        setRefreshData(!refreshData);
        setDeleteInventoryModal(false);
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

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div>
      {/* Add Inventory  */}
      <Dialog
        open={addInventoryModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setAddInventoryModal(false)}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add Inventory</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddInventory
            setAddInventoryModal={setAddInventoryModal}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        </DialogContent>
      </Dialog>

      {/* Print Modal */}
      <Dialog
        open={printModal}
        maxWidth="md"
        fullWidth
        onClose={() => setPrintModal(false)}
      >
        <BootstrapDialogTitle>Print Inventory Report</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <PrintInventoryTable ref={printRef} data={reportData} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }}
          >
            Print
          </Button>
          <Button
            variant="outlined"
            onClick={() => setPrintModal(false)}
            sx={{ borderColor: "#29B3FD" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Inevntory */}
      <Dialog
        open={deleteInventoryModal}
        maxWidth="sm"
        fullWidth
        onClose={() => {
          if (!deleteLoading) {
            setDeleteInventoryModal(false);
          }
        }}
      >
        <BootstrapDialogTitle>Delete Inventory</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          Are you sure to want Delete this Inventory?
        </DialogContent>
        <DialogActions className="justify-content-between">
          <Button
            variant="contained"
            disabled={deleteLoading}
            size="small"
            sx={{ backgroundColor: "#29B3FD", borderColor: "#29B3FD" }}
            onClick={() => inventoryDelete()}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            disabled={deleteLoading}
            size="small"
            sx={{ borderColor: "#29B3FD" }}
            onClick={() => {
              setSelectedItem({});
              setDeleteInventoryModal(false);
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <div className="grid grid-cols-8  lg:ps-40   pl-6 pr-8 gap-x-2 mb-5">
        <div className="col-span-4 md:col-span-6">
          <TextField
            placeholder="Search"
            fullWidth
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setReportData([]);
            }}
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
              getInventoryReport();
              getInventoryData(1);
            }}
          >
            Filter <FilterAltOutlinedIcon sx={{ fontSize: "20px" }} />
          </Button>
          {reportData?.length > 0 && (
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
              onClick={() => setPrintModal(true)}
            >
              Print <PrintIcon sx={{ fontSize: "20px" }} />
            </Button>
          )}
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
            onClick={() => setAddInventoryModal(true)}
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
          {loading ? (
            <Loading />
          ) : (
            <TableContainer sx={{ overflow: "auto" }}>
              <Table className={cx(classes.table, classes.hover)}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ width: "1%" }}></TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Product Code
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Product Name
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Product Of
                    </TableCell>

                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Damage Qty
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Add Qty
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Add Damage Qty
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                    >
                      Total
                    </TableCell>

                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
                      sx={{ width: "7%" }}
                      align="center"
                    >
                      Add
                    </TableCell>
                    <TableCell
                      style={{
                        color: Colors.inventory.headColor,
                      }}
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
                          <TableCell>
                            <Avatar
                              sx={{ width: 60, height: 60, fontSize: "2rem" }}
                              src={
                                item.product_picture ? item.product_picture : ""
                              }
                            />
                          </TableCell>
                          <TableCell style={{ wordBreak: "normal" }}>
                            {item.product_code}
                          </TableCell>
                          <TableCell style={{ wordBreak: "normal" }}>
                            {item.product_name}
                          </TableCell>
                          <TableCell>{item?.product_of_name}</TableCell>
                          <TableCell>{item?.quantity}</TableCell>
                          <TableCell>{item?.damage_quantity || 0}</TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={textFieldData[index] || ""}
                              inputProps={{
                                readOnly: updateQuantityLoading[index],
                                inputMode: "numeric",
                              }}
                              onChange={(e) => {
                                textFieldData[index] = e.target.value?.replace(
                                  /[^-0-9]/gi,
                                  ""
                                );
                                setTextFieldData([...textFieldData]);
                              }}
                              sx={{
                                width: "50px",
                                color: Colors.customer.textFieldColor,
                                borderColor: Colors.customer.borderColor,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={textFieldDamageData[index] || ""}
                              inputProps={{
                                readOnly: updateQuantityLoading[index],
                                inputMode: "numeric",
                              }}
                              onChange={(e) => {
                                textFieldDamageData[index] =
                                  e.target.value?.replace(/[^-0-9]/gi, "");
                                setTextFieldDamageData([
                                  ...textFieldDamageData,
                                ]);
                              }}
                              sx={{
                                width: "50px",
                                color: Colors.customer.textFieldColor,
                                borderColor: Colors.customer.borderColor,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {+item?.quantity + (+textFieldData[index] || 0)}
                          </TableCell>
                          <TableCell>
                            <div className=" flex ">
                              <Tooltip title="Update Quantity">
                                <IconButton
                                  onClick={() =>
                                    updateQuantity(item._id, index)
                                  }
                                  disabled={
                                    (!textFieldDamageData[index] &&
                                      !textFieldData[index]) ||
                                    updateQuantityLoading[index]
                                  }
                                >
                                  {updateQuantityLoading[index] ? (
                                    <CircularProgress
                                      size="1rem"
                                      sx={{
                                        color: Colors.inventory.borderColor,
                                      }}
                                    />
                                  ) : (
                                    <AddIcon
                                      sx={{
                                        color: Colors.inventory.borderColor,
                                      }}
                                    />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Tooltip title="Delete Customer">
                              <IconButton
                                onClick={() => {
                                  setSelectedItem(item);
                                  setDeleteInventoryModal(true);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
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

export default InventoryListing;
