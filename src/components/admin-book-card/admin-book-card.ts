import { IBook } from '../../models/interfaces';
import './admin-book-card.css';

//render component

export function AdminBookCard(book:IBook){
    return `
        <div class="admin-book-card">
            <h3>${book.title.substring(0,40).toUpperCase()}</h3>
            <strong>Creado por: ${book.author.substring(0,30)}</strong>
            <p>(${book.publicationDate})</p>
            <span>
                <button>Eliminar</button>
                <button>Editar</button>
            </span>
        </div>
    `;
}

//component logic


