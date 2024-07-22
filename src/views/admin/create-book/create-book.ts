import { CreateBookForm, CreateBookFormLogic } from '../../../components/create-book-form/create-book-form';
import './create-book.css';

export function CreateBook(){
    const $root = document.getElementById('root') as HTMLDivElement;
    
    //render view

    $root.innerHTML=`
        <div class="create-book-container">
            <h2>Crear Libro</h2>
            ${CreateBookForm()}
        </div>
    `;

    //view logic

    CreateBookFormLogic();
}