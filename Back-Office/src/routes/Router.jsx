import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import WelcomePannel from "../Pages/WelcomePannel";
import DonationList from "../Pages/DonationSettings/DonationList.jsx";
import AddDonation from "../Pages/DonationSettings/DonationAdd.jsx";
import UpdateDonation from "../Pages/DonationSettings/DonationUpdate.jsx";
import DonationCenterList from "../Pages/DonationCenterSettings/DonationCenterList.jsx";
import AddDonationCenter from "../Pages/DonationCenterSettings/DonationCenterAdd.jsx";
import UpdateDonationCenter from "../Pages/DonationCenterSettings/DonationCenterUpdate.jsx";

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
            </Routes>
        </BrowserRouter>
    );
}
