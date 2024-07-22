import {
  EditBookForm,
  EditBookFormLogic,
} from '../../../components/edit-book-form/edit-book-form';
import { ApiInteraction } from '../../../controllers/classes';
import { IBook } from '../../../models/interfaces';
import { NavigateTo } from '../../../Router';
import './edit-book.css';

export async function EditBook() {
  //evaluate valid params

  const params = new URLSearchParams(window.location.search);
  const bookID = params.get('bookID');
  const api = new ApiInteraction();
  let bookFlag: boolean = false;
  const books: IBook[] = await api.consultBooks();

  books.forEach((book) => {
    if (book.id === bookID) {
      bookFlag = true;
    }
  });

  if (bookFlag === false) {
    NavigateTo('/not-found');
    return;
  }

  //render view

  const $root = document.getElementById('root') as HTMLDivElement;

  $root.innerHTML = `
        <div class="edit-book-container">
            <h2>Editar Libro</h2>
            ${EditBookForm()}
        </div>
    `;

  //view logic

  EditBookFormLogic(bookID!);
}
