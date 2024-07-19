import { IBook } from '../../models/interfaces';
import './book-card.css'

export function BookCard(book:IBook){
    return `
        <div class="book-card" id="${book.id}">
            <h3>${book.title}</h3>
            <strong>Created by: ${book.author} - ${book.publicationDate.getUTCFullYear}</strong>
            <p>${book.description}</p>
        </div>
    `;
}
