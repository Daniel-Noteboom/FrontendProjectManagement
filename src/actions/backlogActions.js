import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GET_ERRORS } from "./types";


export const addProjectTask = (backlogId, projectTask, navigate) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        navigate('/projectBoard/${backlogId}');
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}