import {SET_TOKEN} from "../actions/types";

const initialState = {};

export default function(state=initialState, action) {
    switch(action.type) {
        case SET_TOKEN:
            return action.payload;
        default:
            return {...state};
    }
}