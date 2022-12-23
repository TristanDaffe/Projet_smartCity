import {SET_DONATIONTYPES} from "./actionsType"

export function setDonationTypes(types) {
    return {
	    type: SET_DONATIONTYPES,
   		payload: types
    }
}