import { NavigateTo } from "../../Router";
import { ApiInteraction } from "../../controllers/classes";
import './login-form.css';

//component structure

export function LoginForm(){
    return `
    <form id="login-form">
        <label for="login-form-userEmail">Correo Electrónico:</label>
        <input id="login-form-userEmail" type="email" required>
        <label for="login-form-userPassword">Contraseña:</label>
        <input id="login-form-userPassword" type="password" required>
        <button type="submit">Iniciar Sesión</button>
    </form>
    `;
}

//component logic

export function LoginFormLogic(){
    const $loginForm=document.querySelector("#login-form") as HTMLDivElement;
    const $userEmail=document.querySelector("#login-form-userEmail") as HTMLInputElement;
    const $userPassword=document.querySelector("#login-form-userPassword") as HTMLInputElement;
    const api=new ApiInteraction;
    $loginForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        if(!$userEmail.value||!$userPassword.value){
            alert("Acceso inválido");
            return;
        }
        await api.authUser({email:$userEmail.value,password:$userPassword.value});
        NavigateTo('/dashboard');
    });
}