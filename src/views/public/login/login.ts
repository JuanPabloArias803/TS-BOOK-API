import { NavigateTo } from "../../../Router";
import { LoginForm, LoginFormLogic } from "../../../components/login-form/login-form";
import "./login.css"

export function Login(){
    const $root = document.getElementById('root') as HTMLDivElement;

    //render view

    $root.innerHTML=`
        <div class="login-container">
            <h2>Iniciar Sesión</h2>
            ${LoginForm()}
            <span>
                <label>No tienes una cuenta?</label>
                <button id="registerBtn" type="button">Registrarse</button>
            </span>
        <div>
    `;

    //view logic
    
    LoginFormLogic();
    
    const registerBtn=document.querySelector("#registerBtn") as HTMLButtonElement;
    registerBtn.addEventListener("click",()=>NavigateTo("/register"));
}