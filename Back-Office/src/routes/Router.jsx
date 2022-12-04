import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SearchForm from '../component/SearchForm';
import Donation from '../component/Donation';
import AddDonation from "../component/AddDonation";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/donationUpdate/:id" element={<Donation/>}/>
                <Route path="/addDonation" element={<AddDonation/>}/>
                <Route path="/" element={<SearchForm/>}/>
            </Routes>
        </BrowserRouter>
    );
}