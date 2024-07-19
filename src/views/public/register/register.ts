import { RegisterForm, RegisterFormLogic } from '../../../components/register-form/register-form';
import './register.css'

export function Register(){
    const $root = document.getElementById('root') as HTMLDivElement;

    //render view

    $root.innerHTML=`
        <div class="register-container">
            <h2>Registro</h2>
            ${RegisterForm()}
        <div>
    `;

    //view logic

    RegisterFormLogic();

}