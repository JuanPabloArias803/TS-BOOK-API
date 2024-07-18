import { Router } from "./Router";

//Check root div and execute router

export function App() {
  const $root = document.getElementById('root') as HTMLDivElement;
  if (!$root) {
    throw new Error('Ocurrió un error inesperado');
  }
  Router();
}