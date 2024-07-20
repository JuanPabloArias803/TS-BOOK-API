import { IBook } from '../../models/interfaces';
import './book-card.css';

//render component

export function BookCard(book:IBook){
    return `
        <div class="book-card">
            <h3>${book.title.substring(0,40).toUpperCase()}</h3>
            <strong>Creado por: ${book.author.substring(0,30)}</strong>
            <p>(${book.publicationDate})</p>
        </div>
    `;
}

//component logic


