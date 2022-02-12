import axios from "axios"
import {GET_ERRORS, GET_PROJECT, GET_PROJECTS, SUBMITTED, DELETE_PROJECT} from "./types"

export const createProject = (project) => async dispatch => {
    try {
        await axios.post("/api/project", project);
        dispatch({
            type: SUBMITTED,
            payload: {"submitted": "true"}
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
}

export const getProject = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/project/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const deleteProject = id => async dispatch => {
    if(window.confirm("Are you sure? This will delete the project and all the data related to it")) {
        await axios.delete(`/api/project/${id}`)
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        })
    }
}