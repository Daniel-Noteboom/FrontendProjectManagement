import { GET_PROJECT, GET_PROJECTS, SUBMITTED, DELETE_PROJECT } from "../actions/types";

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
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.projectIdentifier !== action.payload)
            }
        default:
            return {
                ...state,
                submitted: false
            }
    }
}