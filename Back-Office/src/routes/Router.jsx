import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import WelcomePannel from "../pages/WelcomePannel";

import DonationList from "../pages/DonationSettings/DonationList.jsx";
import AddDonation from "../pages/DonationSettings/DonationAdd.jsx";
import UpdateDonation from "../pages/DonationSettings/DonationUpdate.jsx";

import DonationCenterList from "../pages/DonationCenterSettings/DonationCenterList.jsx";
import AddDonationCenter from "../pages/DonationCenterSettings/DonationCenterAdd.jsx";
import UpdateDonationCenter from "../pages/DonationCenterSettings/DonationCenterUpdate.jsx";

import OpeningDayList from "../pages/OpeningDaySettings/OpeningDayList";
import AddOpeningDay from "../pages/OpeningDaySettings/OpeningDayAdd";
import UpdateOpeningDay from "../pages/OpeningDaySettings/OpeningDayUpdate";

import DonorList from "../pages/DonorSettings/DonorList";
import AddDonor from "../pages/DonorSettings/DonorAdd";
import UpdateDonor from "../pages/DonorSettings/DonorUpdate";

import LoginPannel from "../pages/LoginPannel";

import PrivateRoute from "../component/PrivateRoute";

export default function Router() {

    return (
        <BrowserRouter>
                       <Routes>
                {/* Login */}
                <Route path="/Home" element={<LoginPannel />} />
                {/* Welcome Pannel */}
                <Route
                    path="/welcome"
                    element={
                        <PrivateRoute>
                            <WelcomePannel />
                        </PrivateRoute>
                    }
                />
                {/* Donations */}
                <Route
                    path="/donationList"
                    element={
                        <PrivateRoute>
                            <DonationList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addDonation"
                    element={
                        <PrivateRoute>
                            <AddDonation />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/donationUpdate/:id"
                    element={
                        <PrivateRoute>
                            <UpdateDonation />
                        </PrivateRoute>
                    }
                />
                {/* Donation Centers */}
                <Route
                    path="/donationCenterList"
                    element={
                        <PrivateRoute>
                            <DonationCenterList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addDonationCenter"
                    element={
                        <PrivateRoute>
                            <AddDonationCenter />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="donationCenterUpdate/:id"
                    element={
                        <PrivateRoute>
                            <UpdateDonationCenter />
                        </PrivateRoute>
                    }
                />
                {/* Opening Days */}
                <Route
                    path="/openingDayList"
                    element={
                        <PrivateRoute>
                            <OpeningDayList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="addOpeningDay"
                    element={
                        <PrivateRoute>
                            <AddOpeningDay />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/openingDayUpdate/:id"
                    element={
                        <PrivateRoute>
                            <UpdateOpeningDay />
                        </PrivateRoute>
                    }
                />
                {/* Donors */}
                <Route
                    path="/donorList"
                    element={
                        <PrivateRoute>
                            <DonorList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="addDonor"
                    element={
                        <PrivateRoute>
                            <AddDonor />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/donorUpdate/:id"
                    element={
                        <PrivateRoute>
                            <UpdateDonor />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/welcome" />} />
            </Routes>
        </BrowserRouter>
    );
}

