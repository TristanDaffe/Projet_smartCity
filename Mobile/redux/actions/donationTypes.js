import {SET_DONATIONTYPES} from "./actionsType"

export function setDonationTypes(types) {
    console.log(types)
    return {
	    type: SET_DONATIONTYPES,
   		payload: types
    }
}