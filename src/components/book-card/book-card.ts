import { IBook } from '../../models/interfaces';
import './book-card.css';

//render component

export function BookCard(book:IBook){
    return `
        <div class="book-card">
            <h3>${book.title}</h3>
            <strong>Creado por: ${book.author}</strong>
            <strong>(${book.publicationDate})</strong>
            <p>${book.description}</p>
        </div>
    `;
}

//component logic


