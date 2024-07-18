import { routes } from "./helpers/routes";

export function Router(){

    const path:string=window.location.pathname;
    const token:string|null=localStorage.getItem('userToken');

    if(path==='/'){
        NavigateTo('/login');
        return;
    }

    if(path==='/login'||path==='/register'){
        if(token){
            NavigateTo('/dashboard');
            return;
        }
    }

    const publicRoute=routes.public.find(route=>route.path===path);
    const privateRoute=routes.private.find(route=>route.path===path);

    if(publicRoute){
        publicRoute.view();
        return;
    }

    if(privateRoute){
        if(token){
            privateRoute.view();
            return;
        }
        NavigateTo('/login');
        return;
    }

    NavigateTo('/not-found');
}

export function NavigateTo(path: string) {
    window.history.pushState({}, '', window.location.origin + path);
    Router();
}
  
window.addEventListener('popstate', Router);
