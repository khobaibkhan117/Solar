import React from "react";
import Loading from "../Loading/index";
import loadable from "../../utils/loadable";


// Login 
export const Login = loadable(
  () => import("../Auth/login"),
  {
    fallback: <Loading />,
  }
);

//   Product
export const ProductListing = loadable(
  () => import("../Products/productsListing"),
  {
    fallback: <Loading />,
  }
);

// Sales

export const SalesListing = loadable(
  () => import("../Sales/SalesListing"),
  {
    fallback: <Loading />,
  }
);


// Customer

export const CustomerListing = loadable(
  () => import("../Customers/CustomerListing"),
  {
    fallback: <Loading />,
  }
);

// ProductOF
export const ProductOfListing = loadable(
  () => import("../ProductOf/ProductOfListing"),
  {
    fallback: <Loading />,
  }
);

// InventoryListing
export const InventoryListing = loadable(
  () => import("../Inventory/InventoyListing"),
  {
    fallback: <Loading />,
  }
);


// Home Page
export const HomePage = loadable(
  () => import("../HomePage"),
  {
    fallback: <Loading />,
  }
);


// Home Page
export const UserListing = loadable(
  () => import("../UserManagement/UserListing"),
  {
    fallback: <Loading />,
  }
);


// Bank

export const BankListing = loadable(
  () => import("../Bank/BankListing"),
  {
    fallback: <Loading />,
  }
);



export const PaymentRecovery = loadable(
  () => import("../PaymentRecovery/paymentRecovery"),
  {
    fallback: <Loading />,
  }
);


export const SiteListing = loadable(
  () => import("../Site/SiteListing"),
  {
    fallback: <Loading />,
  }
);
