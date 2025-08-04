import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { BankListing, CustomerListing, HomePage, InventoryListing, Login, PaymentRecovery, ProductListing, ProductOfListing, SalesListing, UserListing } from "./pageListAsync";
import LandingPage from "../LandingPage";
import SiteListing from "../Site/SiteListing";





const ApplicationRoutes = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login", { replace: true })
        }
    }, [window.location.href]);

    return (

        <Routes>
            <Route path="/" >
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>


            <Route path="/app" element={<LandingPage />}>
                <Route path="/app/home" element={<HomePage />} />
                <Route path="/app/product" element={<ProductListing />} />
                <Route path="/app/sale" element={<SalesListing />} />
                <Route path="/app/customer" element={<CustomerListing />} />
                <Route path="/app/othercompanies" element={<ProductOfListing />} />
                <Route path="/app/inventory" element={<InventoryListing />} />
                <Route path="/app/user" element={<UserListing />} />
                <Route path="/app/bank" element={<BankListing />} />
                <Route path="/app/recovery" element={<PaymentRecovery />} />
                <Route path="/app/site" element={<SiteListing />} />
                <Route path="*" element={<Navigate to="/app/home" replace />} />
            </Route>



        </Routes>


    )
}


export default ApplicationRoutes