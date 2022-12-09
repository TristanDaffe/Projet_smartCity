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

import DonationTypeList from "../pages/DonationTypeSettings/DonationTypeList";
import AddDonationType from "../pages/DonationTypeSettings/DonationTypeAdd";
import UpdateDonationType from "../pages/DonationTypeSettings/DonationTypeUpdate";

import DonorList from "../pages/DonorSettings/DonorList";
import AddDonor from "../pages/DonorSettings/DonorAdd";
import UpdateDonor from "../pages/DonorSettings/DonorUpdate";


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePannel/>}/>
                {/* Donations */}
                <Route path="/donationList" element={<DonationList/>}/>
                <Route path="/donationUpdate/:id" element={<UpdateDonation/>}/>
                <Route path="/addDonation" element={<AddDonation/>}/>
                {/* Donation Centers */}
                <Route path="/donationCenterList" element={<DonationCenterList/>}/>
                <Route path="/donationCenterUpdate/:id" element={<UpdateDonationCenter/>}/>
                <Route path="/addDonationCenter" element={<AddDonationCenter/>}/>
                {/* Donation Types */}
                <Route path="/donationTypeList" element={<DonationTypeList/>}/>
                <Route path="/donationTypeUpdate/:id" element={<UpdateDonationType/>}/>
                <Route path="/addDonationType" element={<AddDonationType/>}/>
                {/* Donors */}
                <Route path="/donorList" element={<DonorList/>}/>
                <Route path="/donorUpdate/:id" element={<UpdateDonor/>}/>
                <Route path="/addDonor" element={<AddDonor/>}/>
            </Routes>
        </BrowserRouter>
    );
}
