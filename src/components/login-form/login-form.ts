import { NavigateTo } from "../../Router";
import { ApiInteraction } from "../../models/classes";
import './login-form.css';

//component structure

export function LoginForm(){
    return `
    <form id="login-form">
        <label for="login-form-useremail">Correo Electrónico:</label>
        <input id="login-form-useremail" type="email" required>
        <label for="login-form-userpassword">Contraseña:</label>
        <input id="login-form-userpassword" type="password" required>
        <button type="submit">Iniciar Sesión</button>
    </form>
    `;
}

//component logic

export function LoginFormLogic(){
    const $loginForm=document.querySelector("#login-form") as HTMLDivElement;
    const $useremail=document.querySelector("#login-form-useremail") as HTMLInputElement;
    const $userpassword=document.querySelector("#login-form-userpassword") as HTMLInputElement;
    const api=new ApiInteraction;
    $loginForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        if(!$useremail.value||!$userpassword.value){
            alert("Acceso inválido");
            return;
        }
        await api.authUser({email:$useremail.value,password:$userpassword.value});
        NavigateTo('/dashboard');
    });
}