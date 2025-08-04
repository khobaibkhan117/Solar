import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Colors from "../../utils/colors";
import { showAlert } from "../../utils/customsFunctions";
import { addExpense, addSite, updateSite } from "../../services/site.service";

const AddExpense = (props) => {
  const {
    setModalFlag,
    modalFlag,
    refreshData,
    setRefreshData,
    data,
    selectedExpenseIndex,
    setTableData,
    tableData,
  } = props;
  const email = sessionStorage.getItem("email");
  console.log(
    "selectedExpenseIndex",
    data?.expense?.[selectedExpenseIndex]?.equipment
  );
  const [addExpenseFields, setAddExpenseFields] = useState({
    equipment: "",
    specifications: "",
    brand: "",
    price: "",
    qty: 0,
  });

  useEffect(() => {
    if (selectedExpenseIndex > -1) {
      setAddExpenseFields({
        equipment: tableData?.[selectedExpenseIndex]?.equipment,
        specifications: tableData?.[selectedExpenseIndex]?.specifications,
        brand: tableData?.[selectedExpenseIndex]?.brand,
        price: tableData?.[selectedExpenseIndex]?.price,
        qty: tableData?.[selectedExpenseIndex]?.qty,
      });
    }
  }, [selectedExpenseIndex]);
  const [loading, setLoading] = useState(false);

  const expenseAddData = async () => {
    try {
      setLoading(true);
      const response = await addExpense(email, data?._id, {
        ...addExpenseFields,
        price: parseInt(addExpenseFields.price || "0"),
        qty: parseInt(addExpenseFields.qty || "0"),
      });

      if (response?.data?.status == 200) {
        setLoading(false);
        setRefreshData(!refreshData);
        showAlert(response.data.message, "success");
        setModalFlag({ ...modalFlag, expense: false });
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
  const expenseUpdateData = async () => {
    try {
      setTableData([
        ...tableData.slice(0, selectedExpenseIndex),
        {
          ...addExpenseFields,
          price: parseInt(addExpenseFields.price || "0"),
          qty: parseInt(addExpenseFields.qty || "0"),
        },
        ...tableData.slice(selectedExpenseIndex + 1),
      ]);
      setModalFlag(!modalFlag);
    } catch (err) {
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
      <div className="mb-3">
        <TextField
          label="Equipment"
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
            setAddExpenseFields({
              ...addExpenseFields,
              equipment: e.target.value,
            });
          }}
          value={addExpenseFields.equipment}
        />
      </div>
      <div className="mb-3">
        <TextField
          label="Specifications"
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
            setAddExpenseFields({
              ...addExpenseFields,
              specifications: e.target.value,
            });
          }}
          value={addExpenseFields.specifications}
        />
      </div>
      <div className="mb-3">
        <TextField
          label="Brand"
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
            setAddExpenseFields({ ...addExpenseFields, brand: e.target.value });
          }}
          value={addExpenseFields.brand}
        />
      </div>
      <div className="mb-3">
        <TextField
          label="Price"
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
            setAddExpenseFields({
              ...addExpenseFields,
              price: e.target.value?.replace(/[^0-9]/gi, ""),
            });
          }}
          value={addExpenseFields.price || ""}
        />
      </div>
      <div className="mb-3">
        <TextField
          label="Qty"
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
            setAddExpenseFields({
              ...addExpenseFields,
              qty: e.target.value?.replace(/[^0-9]/gi, ""),
            });
          }}
          value={addExpenseFields.qty || ""}
        />
      </div>

      <div className="mb-3">
        <Button
          className="fw-bold"
          onClick={() => {
            if (selectedExpenseIndex > -1) {
              expenseUpdateData();
            } else {
              expenseAddData();
            }
          }}
          disabled={loading}
          sx={{ backgroundColor: Colors.inventory.buttonColor }}
          fullWidth
          variant="contained"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;
