import Http from './Http';
import { API_BASE_URL } from './Base_URL';
import { authLogin } from "../../store/actions/actions";

export const register = newUser => (dispatch) => {
    return Http
        .post(API_BASE_URL + '/register', newUser, {
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            return (res.data)
        })
        .catch(err => {
            const statusCode = err.response.status;
            const data = {
                error: null,
                statusCode,
            };
            if (statusCode === 422) {
                Object.values(err.response.data.message).map((value,i) => {
                    data.error = value
                });

            }else if (statusCode === 400) {
                data.error = err.response.data.message;
            }
            return err.data;
        })
};

export const login = user => (dispatch) => {
    return Http
        .post(API_BASE_URL + '/login',{
            email: user.email,
            password: user.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            dispatch(authLogin(res.data));
            return (res.data)
        })
        .catch(err => {
            const statusCode = err.response.status;
            const data = {
                error: null,
                statusCode,
            };
            if (statusCode === 401 || statusCode === 422) {
                data.error = err.response.data.message;
            }
            return err.data;
        })
};

export const getProfile = () => {
    return Http
        .get(API_BASE_URL + '/profile', {
            headers: {Authorization: `Bearer ${localStorage.usertoken}`}
        })
        .then(res => {
            return res.data;

        })
        .catch(err => {
            console.log(err)
        })
};



