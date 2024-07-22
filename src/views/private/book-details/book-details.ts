import { ApiInteraction } from '../../../controllers/classes';
import { IBook } from '../../../models/interfaces';
import { NavigateTo } from '../../../Router';
import './book-details.css';

export async function BookDetails(){
   
    //evaluate valid params

    const params = new URLSearchParams(window.location.search);
    const bookID = params.get('bookID');
    const api=new ApiInteraction;
    const books: IBook[] = await api.consultBooks();
    
    const currentBook=books.find(book=>book.id===bookID);
    if (!currentBook) {
        NavigateTo('/not-found');
        return;
    }
    const date = new Date(currentBook.publicationDate);
    const setDate=date.toISOString().substring(0,10).split("-");

    //render view

    const $root = document.getElementById('root') as HTMLDivElement;

    $root.innerHTML=`
        <div class="book-container">
            <h2>Libro: ${currentBook.title}</h2>
            <h3>Escrito por: ${currentBook.author}</h3>
            <strong>El día ${setDate[2]} del mes ${setDate[1]} del año ${setDate[0]}</strong>
            <strong>Descripción:</strong>
            <p>${currentBook.description}</p>
            <strong>Resumen:</strong>
            <p>${currentBook.summary}</p>
        </div>
    `;

}