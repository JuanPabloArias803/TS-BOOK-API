import './navbar.css';
import { NavigateTo } from '../../Router';

//component structure

export function Navbar(role:string){
    const adminComponent=(role==="admin")?`
        <li class="navCreate">Crear Libro</li>
    `:``;
    return `
        <nav>
            <ul>
                <li class="navHome">Home</li>
                ${adminComponent}
                <li class="navLogOut">Cerrar Sesión</li>
            </ul>
        </nav>
    `;
}

//component logic

export function NavbarLogic(){
    const $logOut=document.querySelector(".navLogOut") as HTMLDataListElement;
    const $home=document.querySelector(".navHome") as HTMLDataListElement;
    $logOut.addEventListener("click",()=>{
        sessionStorage.removeItem("UT");
        sessionStorage.removeItem("UR");
        NavigateTo("/");
    });
    $home.addEventListener("click",()=>NavigateTo("/"));
}

export function AdminNavbarLogic(){
    const $create=document.querySelector(".navCreate") as HTMLDataListElement;
    $create.addEventListener("click",()=>NavigateTo("/create-book")) //Navigate to create view
}