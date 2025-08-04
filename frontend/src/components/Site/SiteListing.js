import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Colors from "../../utils/colors";
import useStyles from "./Site-jss";
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
  Autocomplete,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";

import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import Loading from "../Loading";
import { showAlert } from "../../utils/customsFunctions";
import AddSite from "./AddSite";
import { getAllSitePaginate } from "../../services/site.service";
import ViewSite from "./ViewSite";
import EditSite from "./EditSite";
import AddExpense from "./AddExpense";
import { getAllUsers } from "../../services/auth.service";
import { useReactToPrint } from "react-to-print";
import PrintSiteDetails from "./PrintSiteDetails";

const SiteListing = () => {
  const theme = useTheme();
  const { classes, cx } = useStyles();
  const [modalFlag, setModalFlag] = useState({
    add: false,
    edit: false,
    view: false,
    expense: false,
  });
  const [refreshData, setRefreshData] = useState(false);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const email = sessionStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const [selectedSite, setSelectedSite] = useState({});
  const [allUsers, setAllusers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const printRef = useRef();
  const [selectedSiteForPrint, setSelectedSiteForPrint] = useState(null);
  const [siteExpenses, setSiteExpenses] = useState([]);

  useEffect(() => {
    getSiteData(1);
  }, [refreshData]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsers(email);
      if (response.data.status == 200) {
        setAllusers(response.data.data);
      }
    } catch (error) {}
  };

  const getSiteData = async (page_number) => {
    try {
      setLoading(true);
      const response = await getAllSitePaginate(
        email,
        "10",
        page_number,
        "",
        selectedUser?.map((item) => item._id)
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
          noWrap
          fontWeight={theme.typography.fontWeightBold}
          sx={{ color: Colors.customer.headColor, fontSize: "2.5rem" }}
        >
          {" "}
          {children}{" "}
        </Typography>

        <IconButton
          onClick={() => {
            if (modalFlag.add) {
              setModalFlag({ ...modalFlag, add: false });
            } else if (modalFlag.edit) {
              setModalFlag({ ...modalFlag, edit: false });
            } else if (modalFlag.view) {
              setModalFlag({ ...modalFlag, view: false });
            } else if (modalFlag.expense) {
              setModalFlag({ ...modalFlag, expense: false });
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

  const handlePaginationChange = async (event, page) => {
    await getSiteData(page);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handlePrintClick = async (siteData) => {
    setSelectedSiteForPrint(siteData);
    // Here you would typically fetch the expenses for this site
    // For now, we'll use dummy data
    setSiteExpenses([
      {
        date: new Date(),
        description: "Sample Expense 1",
        amount: 1000,
        category: "Materials",
      },
      {
        date: new Date(),
        description: "Sample Expense 2",
        amount: 500,
        category: "Labor",
      },
    ]);
    // Wait for state to update
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

  return (
    <div>
      {/* Add Site */}
      <Dialog
        open={modalFlag.add}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setModalFlag({ ...modalFlag, add: false })}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add Site</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddSite
            setModalFlag={setModalFlag}
            modalFlag={modalFlag}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        </DialogContent>
      </Dialog>

      {/* View Site  */}
      <Dialog
        open={modalFlag.view}
        maxWidth="xs"
        fullWidth
        fullScreen
        onClose={() => setModalFlag({ ...modalFlag, view: false })}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>View Site</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <ViewSite data={selectedSite} />
        </DialogContent>
      </Dialog>

      {/* Edit Site */}
      <Dialog
        open={modalFlag.edit}
        maxWidth="xs"
        fullWidth
        fullScreen
        onClose={() => setModalFlag({ ...modalFlag, edit: false })}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Edit Site</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <EditSite
            data={selectedSite}
            setModalFlag={setModalFlag}
            modalFlag={modalFlag}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        </DialogContent>
      </Dialog>

      {/* Add Expense */}
      <Dialog
        open={modalFlag.expense}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setModalFlag({ ...modalFlag, expense: false })}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Add Expense</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddExpense
            data={selectedSite}
            setModalFlag={setModalFlag}
            modalFlag={modalFlag}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        </DialogContent>
      </Dialog>

      {/* Hidden Print Component */}
      <div style={{ display: "none" }}>
        {selectedSiteForPrint && (
          <PrintSiteDetails ref={printRef} siteData={selectedSiteForPrint} />
        )}
      </div>

      <div className="grid grid-cols-8  lg:ps-40   pl-6 pr-8 gap-x-2 mb-5">
        <div className=" col-span-4 md:col-span-6">
          <Autocomplete
            disableClearable={selectedUser?.length > 0}
            size="small"
            filterSelectedOptions
            sx={{
              width: "100%",
            }}
            options={!allUsers ? [{ name: "Loading...", id: 0 }] : allUsers}
            multiple
            getOptionLabel={(option) =>
              `${option?.name} (${option?.email})` || ""
            }
            value={selectedUser || []}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Name"
                margin="none"
                fullWidth
                variant="outlined"
                sx={{
                  borderColor: Colors.sales.borderColor,
                  backgroundColor: "#D6F0FE",
                  input: {
                    "&::placeholder": {
                      color: Colors.sales.placeHolderColor,
                    },
                  },
                }}
              />
            )}
            onChange={(e, value) => {
              setSelectedUser(value);
            }}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(
                `${option?.name} (${option?.email})`,
                inputValue,
                {
                  insideWords: true,
                }
              );
              const parts = parse(
                `${option?.name} (${option?.email})`,
                matches
              );
              return (
                <li {...props} key={option?._id}>
                  <div>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              );
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
              getSiteData(1);
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
            onClick={() => setModalFlag({ ...modalFlag, add: true })}
          >
            <span style={{ marginRight: "5px" }}>Add</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 30 30"
            >
              <path
                fill="#29B3FD"
                d="M14.97 2.973A2 2 0 0013 5v8H5a2 2 0 100 4h8v8a2 2 0 104 0v-8h8a2 2 0 100-4h-8V5a2 2 0 00-2.03-2.027z"
              ></path>
            </svg>
          </Button>
        </div>
      </div>

      <Paper
        className="mx-2 md:mx-28"
        style={{ minHeight: "50vh" }}
        elevation={15}
      >
        {loading ? (
          <Loading />
        ) : (
          <TableContainer sx={{ overflow: "auto" }}>
            <Table className={cx(classes.table, classes.hover)}>
              <TableHead>
                <TableRow>
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
                    Address
                  </TableCell>

                  <TableCell
                    style={{
                      color: Colors.customer.headColor,
                    }}
                    sx={{ width: "fit-content" }}
                  >
                    Assigned To
                  </TableCell>
                  <TableCell
                    style={{
                      color: Colors.customer.headColor,
                    }}
                  >
                    Budget
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
                        <TableCell style={{ wordBreak: "normal" }}>
                          {item.site_name}
                        </TableCell>
                        <TableCell style={{ wordBreak: "normal" }}>
                          {item.contact_number}
                        </TableCell>
                        <TableCell style={{ wordBreak: "normal" }}>
                          {item.address}
                        </TableCell>
                        <TableCell
                          style={{ wordBreak: "normal" }}
                          sx={{ width: "1%" }}
                        >
                          {item.assignee?.length > 0
                            ? item?.assignee
                                ?.map((item) => item.split(".com_")[0] + ".com")
                                ?.toString()
                            : ""}
                        </TableCell>
                        <TableCell>{item?.budget}</TableCell>
                        <TableCell>
                          <div className=" flex ">
                            <Tooltip title="Print Details">
                              <IconButton
                                onClick={() => handlePrintClick(item)}
                              >
                                <PrintIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Add Expense">
                              <IconButton
                                onClick={() => {
                                  setSelectedSite(item);
                                  setModalFlag({ ...modalFlag, expense: true });
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="View Site">
                              <IconButton
                                onClick={() => {
                                  setSelectedSite(item);
                                  setModalFlag({ ...modalFlag, view: true });
                                }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit Site">
                              <IconButton
                                onClick={() => {
                                  setSelectedSite(item);
                                  setModalFlag({ ...modalFlag, edit: true });
                                }}
                              >
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
  );
};

export default SiteListing;
