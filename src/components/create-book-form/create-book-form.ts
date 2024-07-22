import { ApiInteraction } from '../../controllers/classes';
import { NavigateTo } from '../../Router';
import './create-book-form.css';

export function CreateBookForm(){

    return `
    <form id="create-form">
        <label for="create-form-title">Título:</label>
        <input id="create-form-title" type="text" required>
        <label for="create-form-author">Autor:</label>
        <input id="create-form-author" type="text" required>
        <label for="create-form-description">Descripción:</label>
        <textarea id="create-form-description" required></textarea>
        <label for="create-form-summary">Resumen:</label>
        <textarea id="create-form-summary" required></textarea>
        <label for="create-form-publicationDate">Fecha de publicación:</label>
        <input id="create-form-publicationDate" type="date" required>
        <button type="submit">Crear</button>
    </form>
    `;
}

//component logic

export function CreateBookFormLogic(){
    const $createForm=document.querySelector("#create-form") as HTMLFormElement;
    const $bookTitle=document.querySelector("#create-form-title") as HTMLInputElement;
    const $bookAuthor=document.querySelector("#create-form-author") as HTMLInputElement;
    const $bookDescription=document.querySelector("#create-form-description") as HTMLTextAreaElement;
    const $bookSummary=document.querySelector("#create-form-summary") as HTMLTextAreaElement;
    const $bookPublicationDate=document.querySelector("#create-form-publicationDate") as HTMLInputElement;
    const api=new ApiInteraction;
    $createForm.addEventListener("submit",async (event)=>{
        event.preventDefault();
        if(!$bookTitle.value||!$bookAuthor.value||!$bookDescription.value||!$bookSummary.value||!$bookPublicationDate.value){
            alert("Error al crear el libro");
            return;
        }
        await api.createBook({title:$bookTitle.value,author:$bookAuthor.value,description:$bookDescription.value,summary:$bookSummary.value,publicationDate:$bookPublicationDate.value});
        NavigateTo('/dashboard');
    });
}