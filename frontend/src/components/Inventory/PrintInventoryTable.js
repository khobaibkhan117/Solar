import React, { forwardRef } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import Colors from "../../utils/colors";

const PrintInventoryTable = forwardRef(({ data }, ref) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div ref={ref} style={{ padding: "20px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Inventory Report
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        {formattedDate}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: Colors.inventory.headColor,
                  fontWeight: "bold",
                }}
              >
                Product Code
              </TableCell>
              <TableCell
                style={{
                  color: Colors.inventory.headColor,
                  fontWeight: "bold",
                }}
              >
                Product Name
              </TableCell>
              <TableCell
                style={{
                  color: Colors.inventory.headColor,
                  fontWeight: "bold",
                }}
              >
                Product Of
              </TableCell>
              <TableCell
                style={{
                  color: Colors.inventory.headColor,
                  fontWeight: "bold",
                }}
              >
                Qty
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product_code}</TableCell>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.product_of_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default PrintInventoryTable;
