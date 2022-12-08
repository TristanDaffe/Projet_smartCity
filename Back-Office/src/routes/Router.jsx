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

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/donationList" element={<DonationList/>}/>
                <Route path="/donationUpdate/:id" element={<UpdateDonation/>}/>
                <Route path="/addDonation" element={<AddDonation/>}/>
                <Route path="/" element={<WelcomePannel/>}/>
            </Routes>
        </BrowserRouter>
    );
}