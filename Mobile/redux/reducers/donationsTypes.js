initialState = null;

import {SET_DONATIONTYPES} from "../actions/actionsType"

export const donationTypes = (state = initialState , action) => {
        switch(action.type){
            case SET_DONATIONTYPES:
                return state = action.payload;
            default:
                return state;
        }
    }