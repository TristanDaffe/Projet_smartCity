import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
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

import { getToken } from "../context/LoginContext";

import RoutesChecker from "../component/RoutesChecker";

export default function Router() {

    return (
        <BrowserRouter>
            <RoutesChecker/>
        </BrowserRouter>
    );
}
