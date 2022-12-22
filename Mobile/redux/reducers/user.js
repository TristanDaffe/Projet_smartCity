initialState = null;

import {ADD_TOKEN} from "../actions/actionsType"

export const user = (state = initialState , action) => {
        switch(action.type){
            case ADD_TOKEN:
                console.log(action.payload)
                return state = action.payload;
            default:
                return state;
        }
    }