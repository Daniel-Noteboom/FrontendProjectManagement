import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from "./types";


export const addProjectTask = (backlogId, projectTask, navigate) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        navigate(`/projectBoard/${backlogId}`);
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjectTask = (projectId, taskId) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${projectId}/${taskId}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getBacklog = (backlogId) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const updateProjectTask = (projectTask, navigate) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${projectTask.projectIdentifier}/${projectTask.projectSequence}`, projectTask);
        navigate(`/projectBoard/${projectTask.projectIdentifier}`);
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const deleteProjectTask = (projectId, taskId) => async dispatch => {
    if(window.confirm("Are you sure? This will permanently delete the project task")) {
        await axios.delete(`/api/backlog/${projectId}/${taskId}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: taskId
        })
    }
}