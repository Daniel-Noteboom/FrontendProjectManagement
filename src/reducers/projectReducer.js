import { GET_PROJECT, GET_PROJECTS, SUBMITTED } from "../actions/types";

const initialState = {
    projects: [],
    project: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                submitted: false
            }
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload,
                submitted: false
            }
        case SUBMITTED:
            return {
                ...state,
                submitted: action.payload
            }
        default:
            return {
                ...state,
                submitted: false
            }
    }
}