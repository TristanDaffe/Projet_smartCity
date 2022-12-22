import {combineReducers} from "redux";
import {center} from "./center";
import {userDonation} from "./userDonation";
import {user} from "./user"

export const rootReducers = combineReducers({
    center,
    userDonation,
    user,
})
