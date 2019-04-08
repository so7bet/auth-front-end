import { loginUser, checkAuth, logoutUser } from "../actions/constants";
import Http from '../../components/helpers/Http'

const user = {
    id: null,
    name: null,
    email: null,
    admin: null,
    createdAt: null,
    updatedAt: null
};

const initialState = {
    isAuthenticated : false,
    isAdmin: false,
    user
};

const Auth = (state=initialState, {type, payload = null}) => {
    switch (type) {
        case loginUser:
            return auth_login(state, payload);
        case checkAuth:
            return check_Auth(state);
        case logoutUser:
            return logout(state);
        default:
            return state
    }
};

const auth_login = (state, payload) => {
    const jwt_token = payload.token;
    const user = payload.user[0];
    if (payload.user[0].admin === 1 ){
        localStorage.setItem('is_admin',true);
    } else if (payload.user[0].admin === null ) {
        localStorage.setItem('is_admin',false);
    }
    localStorage.setItem('jwt_token',jwt_token);
    Http.defaults.headers.common['Authorization'] = `Bearer ${jwt_token}`;
    state = Object.assign({}, state, {
        isAuthenticated: true,
        isAdmin: localStorage.getItem('is_admin') === 'true',
        user
    });
    return state;
};

const check_Auth = (state) => {
    state = Object.assign({}, state, {
        isAuthenticated : !!localStorage.getItem('jwt_token'),
        isAdmin : localStorage.getItem('is_admin'),
    });
    if (state.isAuthenticated){
        Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    }
    return state
};

const logout = (state) => {
    localStorage.removeItem('jwt_token');
    localStorage.setItem('is_admin', false);
    state = Object.assign({}, state,{
        isAuthenticated: false,
        isAdmin: false,
        user
    });
    return state
};

export default Auth;






