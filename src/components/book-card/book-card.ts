import { isAdmin } from '../../helpers/verifiers';
import { IBook } from '../../models/interfaces';
import './book-card.css';

//render component

export function BookCard(book:IBook){

    function adminComponent():string{
        const role:any=sessionStorage.getItem('UR'); //recover role from sessionStorage
        if (role&&isAdmin(role)){  //verify admin role
            return `
                <span>
                    <button>Eliminar</button>
                    <button>Editar</button>
                </span>
            `;
        }else{return "";}
    }
    
    return `
        <div class="book-card">
            <h3>${book.title.substring(0,40).toUpperCase()}</h3>
            <strong>Creado por: ${book.author.substring(0,30)}</strong>
            <p>(${book.publicationDate})</p>
            ${adminComponent()}
        </div>
    `;
}

//component logic


