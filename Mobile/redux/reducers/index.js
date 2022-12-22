import {combineReducers} from "redux";
import {center} from "./center";
import {userDonation} from "./userDonation";
import {donationTypes} from "./donationsTypes";

export const rootReducers = combineReducers({
    center,
    userDonation,
    donationTypes,
})
