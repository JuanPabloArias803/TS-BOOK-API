import { NavigateTo } from '../../Router';
import { ApiInteraction } from '../../controllers/classes';
import './register-form.css';

//component structure

export function RegisterForm() {
  return `
    <form id="register-form">
        <label for="register-form-userName">Nombre:</label>
        <input id="register-form-userName" type="text" required>
        <label for="register-form-userLastName">Apellido:</label>
        <input id="register-form-userLastName" type="text" required>
        <label for="register-form-userEmail">Correo Electrónico:</label>
        <input id="register-form-userEmail" type="email" required>
        <label for="register-form-userPassword">Contraseña:</label>
        <input id="register-form-userPassword" type="password" required>
        <button type="submit">Registrarse</button>
    </form>
    `;
}

//component logic

export function RegisterFormLogic() {
  const $registerForm = document.querySelector(
    '#register-form'
  ) as HTMLDivElement;
  const $userName = document.querySelector(
    '#register-form-userName'
  ) as HTMLInputElement;
  const $userLastName = document.querySelector(
    '#register-form-userLastName'
  ) as HTMLInputElement;
  const $userEmail = document.querySelector(
    '#register-form-userEmail'
  ) as HTMLInputElement;
  const $userPassword = document.querySelector(
    '#register-form-userPassword'
  ) as HTMLInputElement;
  const api = new ApiInteraction();

  $registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (
      !$userName.value ||
      !$userLastName.value ||
      !$userEmail.value ||
      !$userPassword.value
    ) {
      //verify input values
      alert('Registro inválido');
      return;
    }
    await api.createUser({
      name: $userName.value,
      lastName: $userLastName.value,
      email: $userEmail.value,
      password: $userPassword.value,
    });
    NavigateTo('/login');
  });
}
