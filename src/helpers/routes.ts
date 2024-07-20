import { AdminDashboard } from "../views/admin/admin-dashboard";
import { Dashboard } from "../views/private/dashboard/dashboard";
import { Login } from "../views/public/login/login";
import { Register } from "../views/public/register/register";

export const routes = {
    private: [
        { path: '/dashboard', view: Dashboard},
    ],
    public: [
        { path: '/login', view: Login},
        { path: '/register', view: Register }
        // { path: '/not-found', view: NotFound } 
    ],
    admin:[
        {path:'/dashboard',view:AdminDashboard}
    ]
};