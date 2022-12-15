import React from "react";
import {getToken} from "../context/LoginContext";
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

import OpeningDayList from "../pages/DonationTypeSettings/OpeningDayList";
import AddOpeningDay from "../pages/DonationTypeSettings/OpeningDayAdd";
import UpdateOpeningDay from "../pages/DonationTypeSettings/OpeningDayUpdate";

import DonorList from "../pages/DonorSettings/DonorList";
import AddDonor from "../pages/DonorSettings/DonorAdd";
import UpdateDonor from "../pages/DonorSettings/DonorUpdate";

import LoginPannel from "../pages/LoginPannel";

export default class RoutesChecker extends React.Component {
    
    render() {
        return (
            <Routes>
                    {/** Only if we get token */}
                    {getToken() ? (
                        <>
                            {console.log("on est bons")}
                            {/* Welcome Pannel */}
                            <Route path="/welcome" element={<WelcomePannel />} />
                            {/* Donations */}
                            <Route path="/donationList" element={<DonationList />} />
                            <Route path="/donationUpdate/:id" element={<UpdateDonation />} />
                            <Route path="/addDonation" element={<AddDonation />} />
                            {/* Donation Centers */}
                            <Route path="/donationCenterList" element={<DonationCenterList />} />
                            <Route path="/donationCenterUpdate/:id" element={<UpdateDonationCenter />} />
                            <Route path="/addDonationCenter" element={<AddDonationCenter />} />
                            {/* Opening Days */}
                            <Route path="/openingDayList" element={<OpeningDayList />} />
                            <Route path="/openingDayUpdate/:id" element={<UpdateOpeningDay />} />
                            <Route path="/addOpeningDay" element={<AddOpeningDay />} />
                            {/* Donors */}
                            <Route path="/donorList" element={<DonorList />} />
                            <Route path="/donorUpdate/:id" element={<UpdateDonor />} />
                            <Route path="/addDonor" element={<AddDonor />} />
                            {/* Login */}
                            <Route path="/login" element={<LoginPannel />} />
                        </>
    
                    ) : (
                        <Route path="/login" element={<LoginPannel />} />
                    )}
                </Routes>
        );

}
}
    

                



