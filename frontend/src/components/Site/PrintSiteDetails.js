import React, { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import Colors from "../../utils/colors";

const PrintSiteDetails = forwardRef(({ siteData }, ref) => {
  const theme = useTheme();

  return (
    <div
      ref={ref}
      style={{ padding: "20px", width: "210mm", minHeight: "297mm" }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src={require("../../images/logo.png")}
          style={{ width: "50px", height: "50px", marginBottom: "10px" }}
          alt="Logo"
        />
        <h1 style={{ color: Colors.customer.headColor, margin: 0 }}>
          Site Details
        </h1>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2
          style={{
            color: Colors.customer.headColor,
            borderBottom: "2px solid #29B3FD",
            paddingBottom: "5px",
          }}
        >
          Site Information
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <div>
            <p>
              <strong>Site Name:</strong> {siteData.site_name}
            </p>
            <p>
              <strong>Contact Number:</strong> {siteData.contact_number}
            </p>
            <p>
              <strong>Address:</strong> {siteData.address}
            </p>
          </div>
          <div>
            <p>
              <strong>Assigned To:</strong>{" "}
              {siteData.assignee?.length > 0
                ? siteData.assignee.map((item) => (
                    <div>{item.split(".com_")[0] + ".com"}</div>
                  ))
                : "Not Assigned"}
            </p>
            <p>
              <strong>Budget:</strong> {siteData.budget}
            </p>
          </div>
        </div>
      </div>

      {siteData.expense && siteData.expense.length > 0 && (
        <div>
          <h2
            style={{
              color: Colors.customer.headColor,
              borderBottom: "2px solid #29B3FD",
              paddingBottom: "5px",
            }}
          >
            Expense Details
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#D6F0FE" }}>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Equipment
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Specifications
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Brand
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "right",
                  }}
                >
                  Qty
                </th>
                <th
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "right",
                  }}
                >
                  Prices
                </th>
              </tr>
            </thead>
            <tbody>
              {siteData.expense.map((expense, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                  }}
                >
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {expense.equipment}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {expense.specifications}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {expense.brand}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    {expense.qty}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "right",
                    }}
                  >
                    {+expense.qty * +expense.price}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: "#D6F0FE", fontWeight: "bold" }}>
                <td
                  colSpan="2"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "right",
                  }}
                >
                  Total Expenses:
                </td>
                <td
                  colSpan="3"
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "right",
                  }}
                >
                  {siteData.expense
                    .reduce(
                      (sum, expense) => sum + +expense.qty * +expense.price,
                      0
                    )
                    .toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          width: "100%",
          textAlign: "center",
          borderTop: "1px solid #ddd",
          paddingTop: "10px",
          marginTop: "20px",
        }}
      >
        <p style={{ margin: "5px 0" }}>
          Generated on: {new Date().toLocaleDateString()}
        </p>
        <p style={{ margin: "5px 0" }}>
          © {new Date().getFullYear()} Solar One
        </p>
      </div>
    </div>
  );
});

export default PrintSiteDetails;
