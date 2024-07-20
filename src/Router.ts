import { routes } from "./helpers/routes";
import CryptoJS from 'crypto-js';

export function Router(){
    const key:string=import.meta.env.VITE_KEY //Simulate server .env variable
    const path:string=window.location.pathname;
    const token:any=localStorage.getItem('UT'); //recover token from LocalStorage

    if(path==='/'){
        NavigateTo('/login');
        return;
    }

    if(path==='/login'||path==='/register'){
        if(token){
            if(CryptoJS.AES.decrypt(token,key).toString(CryptoJS.enc.Utf8).split(".").length===3){
                NavigateTo('/dashboard');
                return;
            }
            
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
            if(CryptoJS.AES.decrypt(token,key).toString(CryptoJS.enc.Utf8).split(".").length===3){
                privateRoute.view();
                return;
            }
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
