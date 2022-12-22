import {ADD_TOKEN} from "./actionsType"

export function addToken(token) {
    return {
	    type: ADD_TOKEN,
   		payload: token
        
    }
}