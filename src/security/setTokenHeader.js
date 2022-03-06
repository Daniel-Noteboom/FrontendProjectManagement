import axios from "axios";

export default function(token) {
    axios.defaults.headers.common['Authorization'] = token;
}