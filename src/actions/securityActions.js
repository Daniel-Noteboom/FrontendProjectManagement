import axios from "axios";
import setTokenHeader from "../security/setTokenHeader";
import { SET_TOKEN, GET_ERRORS } from "./types";

export const createNewUser = (user, navigate) => async dispatch => {
    try {
        await axios.post("api/users/register", user);
        navigate("/dashboard");
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const loginUser = (user, navigate) => async dispatch => {
    try {
        const res = await axios.post("api/users/login", user);
        localStorage.setItem("token", res.data.token);
        loginHelper(dispatch, res.data.token);
        navigate("/dashboard");
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const logout = () => async dispatch => {
    logoutHelper(dispatch);
}

export const loginHelper = (dispatch, token) => {
    setTokenHeader(token);
    dispatch({
        type: SET_TOKEN,
        payload: {success: true, token: token}
    })
}
export const logoutHelper = (dispatch) => {
    localStorage.removeItem("token");
    setTokenHeader(false);
    dispatch({
        type: SET_TOKEN,
        payload: {}
    })
}