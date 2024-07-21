import { ApiInteraction } from '../../controllers/classes';
import { IBook } from '../../models/interfaces';
import { NavigateTo } from '../../Router';
import './book-card.css';

//render component

export function BookCard(book:IBook,role:string){
    const adminComponent=(role==="admin")?`
        <span>
            <button class="delete-btn" bookID="${book.id}">Eliminar</button>
            <button class="edit-btn" bookID="${book.id}">Editar</button>
        </span>
    `:``;
    return `
        <div class="book-card">
            <h3>${book.title.substring(0,40).toUpperCase()}</h3>
            <strong>Creado por: ${book.author.substring(0,30)}</strong>
            <p>(${book.publicationDate})</p>
            ${adminComponent}
        </div>
    `;
}

//component logic

   

export function AdminBookCardLogic(){
    const api=new ApiInteraction;
    document.querySelectorAll(".delete-btn").forEach((deleteBtn)=>{
        deleteBtn.addEventListener("click",async ()=>{
            await api.deleteBook(deleteBtn.getAttribute("bookID")!);
            NavigateTo("/dashboard");
        });
    });
}




