import axios from 'axios';
import store from '../../store'
import { auth_logout} from "../../store/actions/actions";

let token = document.head.querySelector('meta[name="csrf-token"]');
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;

axios.interceptors.response.use(
    response => response,
    (error) => {
        if(error.response.status === 401 ){
            store.dispatch(auth_logout())
        }
        return Promise.reject(error)
    }
);
export default axios;