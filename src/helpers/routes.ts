import { Dashboard } from "../views/private/dashboard/dashboard";
import { Login } from "../views/public/login/login";

export const routes = {
    private: [
        { path: '/dashboard', view: Dashboard},
    ],
    public: [
        { path: '/login', view: Login},
        // { path: '/register', view: RegisterPage }  ,
        // { path: '/not-found', view: NotFound }  
    ]
};