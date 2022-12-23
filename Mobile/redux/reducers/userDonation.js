initialState = null;
import {SET_USERDONATIONS , ADD_USERDONATION} from "../actions/actionsType"

export const userDonation = (state = initialState , action) => {

        switch(action.type){
            case SET_USERDONATIONS:
                return state = action.payload;
            case ADD_USERDONATION:
                    return [...state,{
                    id: action.payload.id,
                    date : action.payload.date,
                    hour : action.payload.hour,
                    center : action.payload.center,
                    type : action.payload.type,
                    }]
                    
            default:
                return state;
        }
    }