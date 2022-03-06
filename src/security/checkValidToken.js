import jwtDecode from "jwt-decode";

export default function() {
    if(localStorage.getItem("token")) {
        const token = jwtDecode(localStorage.getItem("token"));
        if(token.exp > new Date().getTime()) {
            return true;
        }
    }
    return false;

}