import {ADD_USERDONATION , SET_USERDONATIONS} from "./actionsType"

export function setUserDonation(donations) {
    return {
	    type: SET_USERDONATIONS,
   		payload: donations
        
    }
}

export function addUserDonation(donation) {
    return {
	    type: ADD_USERDONATION,
   		payload: donation
    }
}

