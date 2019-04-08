import Home from '../components/Home/Home';
import LogIn from '../components/LogIn/LogIn';
import Register from '../components/Register/Register';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import ResetPassword from '../components/ResetPassword/ResetPassword';
import AdminDashboard from '../components/Admin/AdminDashboard';
import NoMatch from '../components/NoMatch/NoMatch';

const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: LogIn
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forget-password',
        exact: true,
        auth: false,
        component: ForgetPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: '/admin_dashboard',
        exact: true,
        auth: true,
        component: AdminDashboard
    },
    {
        path: '',
        exact: true,
        auth: false,
        component: NoMatch
    }
];

export default routes;
