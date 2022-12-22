initialState = null;

import {SET_CENTERS} from "../actions/actionsType"

export const center = (state = initialState , action) => {
        switch(action.type){
            case SET_CENTERS:
                return state = action.payload;
            default:
                return state;
        }
    }