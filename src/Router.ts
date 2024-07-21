import { routes } from "./helpers/routes";
import { isAdmin, validToken } from "./helpers/verifiers";

export function NavigateTo(path: string) {
    window.history.pushState({}, '', window.location.origin + path); //modify the path URL in browser
    Router();
}

export function Router(){

    const path:string=window.location.pathname;   //read the URL path
    const token:any=sessionStorage.getItem('UT'); //recover encrypted token from sessionStorage
    const role:any=sessionStorage.getItem('UR');  //recover encrypted role from sessionStorage
    const publicRoute=routes.public.find(route=>route.path===path);    //search path in routes.public objects
    const privateRoute=routes.private.find(route=>route.path===path);  //search path in routes.private objects
    const adminRoute=routes.admin.find(route=>route.path===path);      //search path in routes.admin objects

    if(path==='/'){
        NavigateTo('/login');
        return;
    }

    if(path==='/login'||path==='/register'){
        if(token&&role&&validToken(token)){ //if user is authed
            NavigateTo('/dashboard');
            return;
        }
    }

    if(publicRoute){
        publicRoute.view(); //show to anyone
        return;
    }

    if(adminRoute){
        if(token&&role&&validToken(token)&&isAdmin(role)){ //if user is authed admin
            adminRoute.view();
            return;
        }
    }

    if(privateRoute){
        if(token&&role&&validToken(token)){ //if user is authed
            privateRoute.view();
            return;
        }
        NavigateTo('/login');
        return;
    }

    NavigateTo('/not-found'); //if path doesn't exist in routes
}

window.addEventListener('popstate', Router); //listen URL changes
