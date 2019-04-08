import { loginUser, logoutUser, checkAuth } from "./constants";

export const authLogin = (payload) => ({
    type: loginUser,
    payload
});

export const authCheck = () => ({
    type: checkAuth
});

export const auth_logout = () => ({
    type: logoutUser
});
