import {
  Autocomplete,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Colors from "../../utils/colors";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { getAllUsers } from "../../services/auth.service";
import useStyles from "./Site-jss";

const ViewSite = (props) => {
  const { data } = props;
  const email = sessionStorage.getItem("email");
  const [allUsers, setAllusers] = useState([]);
  const { cx, classes } = useStyles();
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
    status: true,
  });

  return (
    <div>
      <div className=" grid grid-cols-3 gap-4">
        <div className="mb-3">
          <TextField
            label="Name"
            margin="none"
            fullWidth
            size="small"
            variant="outlined"
            inputProps={{ readOnly: true }}
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
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
            inputProps={{ readOnly: true }}
            sx={{
              borderColor: Colors.inventory.borderColor,
              input: {
                "&::placeholder": {
                  color: Colors.inventory.placeHolderColor,
                },
              },
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
            inputProps={{ readOnly: true }}
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
            inputProps={{ readOnly: true }}
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
            inputProps={{ readOnly: true }}
            value={addSiteFields.description}
          />
        </div>
      </div>

      <div className="mb-3">
        <Autocomplete
          disableClearable={!addSiteFields.assignee}
          size="small"
          readOnly
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.expense?.map((item, index) => {
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
                      {data?.expense
                        .slice(0, index + 1)
                        .reduce(
                          (sum, curr) => sum + +curr.qty * +curr.price,
                          0
                        )}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewSite;
