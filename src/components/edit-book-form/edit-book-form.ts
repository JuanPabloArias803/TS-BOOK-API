import { ApiInteraction } from '../../controllers/classes';
import { NavigateTo } from '../../Router';
import './edit-book-form.css';

export function EditBookForm(){

    return `
    <form id="edit-form">
        <label for="edit-form-title">Título:</label>
        <input id="edit-form-title" type="text" required>
        <label for="edit-form-author">Autor:</label>
        <input id="edit-form-author" type="text" required>
        <label for="edit-form-description">Descripción:</label>
        <textarea id="edit-form-description" required></textarea>
        <label for="edit-form-summary">Resumen:</label>
        <textarea id="edit-form-summary" required></textarea>
        <label for="edit-form-publicationDate">Fecha de publicación:</label>
        <input id="edit-form-publicationDate" type="date" required>
        <button type="submit">Actualizar</button>
    </form>
    `;
}

//component logic

export async function EditBookFormLogic(bookID:string){
    const $editForm=document.querySelector("#edit-form") as HTMLFormElement;
    const $bookTitle=document.querySelector("#edit-form-title") as HTMLInputElement;
    const $bookAuthor=document.querySelector("#edit-form-author") as HTMLInputElement;
    const $bookDescription=document.querySelector("#edit-form-description") as HTMLTextAreaElement;
    const $bookSummary=document.querySelector("#edit-form-summary") as HTMLTextAreaElement;
    const $bookPublicationDate=document.querySelector("#edit-form-publicationDate") as HTMLInputElement;
    const api=new ApiInteraction;
    const currentBook=await api.consultOneBook(bookID);
    $bookTitle.value=currentBook.title;
    $bookAuthor.value=currentBook.author;
    $bookDescription.value=currentBook.description;
    $bookSummary.value=currentBook.summary;
    const date = new Date(currentBook.publicationDate);
    const setDate=date.toISOString().substring(0,10).split("-");
    $bookPublicationDate.value= `${setDate[0]}-${setDate[1]}-${setDate[2]}`;
    $editForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        if(!$bookTitle.value||!$bookAuthor.value||!$bookDescription.value||!$bookSummary.value||!$bookPublicationDate.value){
            alert("Error al actualizar el libro");
            return;
        }
        await api.editBook({title:$bookTitle.value,author:$bookAuthor.value,description:$bookDescription.value,summary:$bookSummary.value,publicationDate:$bookPublicationDate.value},bookID)
        NavigateTo('/dashboard');
    });
}