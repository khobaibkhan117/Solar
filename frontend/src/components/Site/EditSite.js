import {
  Autocomplete,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  DialogTitle,
  Hidden,
  Dialog,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Colors from "../../utils/colors";
import { showAlert } from "../../utils/customsFunctions";
import { updateSite } from "../../services/site.service";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { getAllUsers } from "../../services/auth.service";
import useStyles from "./Site-jss";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddExpense from "./AddExpense";
import { useTheme } from "@mui/material/styles";

const EditSite = (props) => {
  const { setModalFlag, modalFlag, refreshData, setRefreshData, data } = props;
  const theme = useTheme();
  const email = sessionStorage.getItem("email");
  const { cx, classes } = useStyles();

  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [tableData, setTableData] = useState([]);

  const [allUsers, setAllusers] = useState([]);

  useEffect(() => {
    if (data?.expense?.length > 0) {
      setTableData([...data.expense]);
    }
  }, [data]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getAllUsers(email);
      if (response.data.status == 200) {
        setAllusers(response.data.data);
        if (data?.assignee?.length > 0) {
          let assignee = response.data.data.filter((item) =>
            data?.assignee.includes(item._id)
          );
          setAddSiteFields({ ...addSiteFields, assignee: assignee });
        }
      }
    } catch (error) {}
  };
  const [addSiteFields, setAddSiteFields] = useState({
    name: data?.site_name || "",
    description: data?.site_description || "",
    contact_number: data?.contact_number || "",
    address: data?.address || "",
    budget: data?.budget || 0,
    assignee: [],
    expense: data?.expense || [],
    status: data?.status == true ? true : false,
  });

  const [loading, setLoading] = useState(false);

  const siteUpdateData = async () => {
    try {
      setLoading(true);
      const response = await updateSite(
        email,
        data?._id,
        addSiteFields.name,
        addSiteFields.description,
        addSiteFields.contact_number,
        parseInt(addSiteFields.budget || "0"),
        addSiteFields.address,
        addSiteFields.assignee?.map((item) => item._id),
        addSiteFields.expense
      );

      if (response?.data?.status == 200) {
        setLoading(false);
        setRefreshData(!refreshData);
        showAlert(response.data.message, "success");
        setModalFlag({ ...modalFlag, edit: false });
      } else {
        setLoading(false);

        showAlert(response.data.message, "error");
      }
    } catch (err) {
      setLoading(false);

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
            if (addExpenseModal) {
              setAddExpenseModal(false);
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

  return (
    <div>
      <Dialog
        open={addExpenseModal}
        maxWidth="xs"
        fullWidth
        // fullScreen
        onClose={() => setAddExpenseModal}
        classes={{ paper: classes.modalBG }}
      >
        <BootstrapDialogTitle>Update Expense</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <AddExpense
            data={data}
            setModalFlag={setAddExpenseModal}
            modalFlag={addExpenseModal}
            selectedExpenseIndex={selectedExpense}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
            setTableData={setTableData}
            tableData={tableData}
          />
        </DialogContent>
      </Dialog>
      <div className=" grid grid-cols-3 gap-4">
        <div className="mb-3">
          <TextField
            label="Name"
            margin="none"
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
            }}
            onChange={(e) => {
              setAddSiteFields({ ...addSiteFields, name: e.target.value });
            }}
            value={addSiteFields.name}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Contact Number"
            margin="none"
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
            }}
            onChange={(e) => {
              setAddSiteFields({
                ...addSiteFields,
                contact_number: e.target.value,
              });
            }}
            value={addSiteFields.contact_number}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Budget"
            margin="none"
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
            }}
            onChange={(e) => {
              setAddSiteFields({
                ...addSiteFields,
                budget: e.target.value?.replace(/[^0-9]/gi, ""),
              });
            }}
            value={addSiteFields.budget || ""}
          />
        </div>
      </div>

      <div className=" grid grid-cols-2 gap-4">
        <div className="mb-3">
          <TextField
            label="Address"
            multiline
            margin="none"
            rows={3}
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
            }}
            onChange={(e) => {
              setAddSiteFields({ ...addSiteFields, address: e.target.value });
            }}
            value={addSiteFields.address}
          />
        </div>

        <div className="mb-3">
          <TextField
            label="Description"
            multiline
            margin="none"
            fullWidth
            size="small"
            rows={3}
            variant="outlined"
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
            }}
            onChange={(e) => {
              setAddSiteFields({
                ...addSiteFields,
                description: e.target.value,
              });
            }}
            value={addSiteFields.description}
          />
        </div>
      </div>
      <div className="mb-3">
        <Autocomplete
          disableClearable={!addSiteFields.assignee}
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
          value={addSiteFields.assignee || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Name"
              margin="none"
              fullWidth
              variant="outlined"
              sx={{
                borderColor: Colors.sales.borderColor,
                input: {
                  "&::placeholder": {
                    color: Colors.sales.placeHolderColor,
                  },
                },
              }}
            />
          )}
          onChange={(e, value) => {
            setAddSiteFields({ ...addSiteFields, assignee: value });
          }}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(
              `${option?.name} (${option?.email})`,
              inputValue,
              {
                insideWords: true,
              }
            );
            const parts = parse(`${option?.name} (${option?.email})`, matches);
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

      <Typography variant="h4" gutterBottom>
        Expenses{" "}
      </Typography>

      <TableContainer sx={{ overflow: "auto" }}>
        <Table className={cx(classes.table, classes.hover)}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Sr#
              </TableCell>
              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Equipment's
              </TableCell>
              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Specifications
              </TableCell>

              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Brand
              </TableCell>
              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Qty
              </TableCell>

              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Prices
              </TableCell>

              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
              >
                Total
              </TableCell>

              <TableCell
                style={{
                  color: Colors.customer.headColor,
                }}
                sx={{ width: "5%" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((item, index) => {
              return (
                <>
                  <TableRow key={index}>
                    <TableCell style={{ wordBreak: "normal" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ wordBreak: "normal" }}>
                      {item.equipment}
                    </TableCell>
                    <TableCell>{item?.specifications}</TableCell>
                    <TableCell>{item?.brand}</TableCell>
                    <TableCell>{item?.qty}</TableCell>
                    <TableCell>{+item?.qty * +item?.price}</TableCell>

                    <TableCell>
                      {tableData
                        .slice(0, index + 1)
                        .reduce(
                          (sum, curr) => sum + +curr.qty * +curr.price,
                          0
                        )}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit Expense">
                        <IconButton
                          onClick={() => {
                            setSelectedExpense(index);
                            setAddExpenseModal(true);
                          }}
                        >
                          <EditIcon />
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

      <div className="my-3">
        <Button
          className="fw-bold"
          onClick={() => siteUpdateData()}
          disabled={loading}
          sx={{ backgroundColor: Colors.inventory.buttonColor }}
          fullWidth
          variant="contained"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditSite;
