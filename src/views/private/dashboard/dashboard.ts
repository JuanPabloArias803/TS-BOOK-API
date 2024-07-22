import {
  BookCard,
  AdminBookCardLogic,
  BookCardLogic,
} from '../../../components/book-card/book-card';
import {
  AdminNavbarLogic,
  Navbar,
  NavbarLogic,
} from '../../../components/navbar/navbar';
import { ApiInteraction } from '../../../controllers/classes';
import { isAdmin } from '../../../helpers/verifiers';
import './dashboard.css';

export async function Dashboard() {
  const $root = document.getElementById('root') as HTMLDivElement;
  const role: any = sessionStorage.getItem('UR'); //recover role from sessionStorage
  const cardRole = role && isAdmin(role) ? 'admin' : 'user'; //check role
  //render view

  $root.innerHTML = `
        ${Navbar(cardRole)}
        <div class="dashboard-container">
            <h1>Libros disponibles</h1>
            <div class="cards-container"></div>
        </div>
    `;

  //view logic

  const $cardsContainer = document.querySelector(
    '.cards-container'
  ) as HTMLDivElement;
  const api = new ApiInteraction();
  const books = await api.consultBooks();
  let cards: string = '';
  books.forEach((book) => {
    //for each book render a card
    const date = new Date(book.publicationDate);
    const setDate = date.toISOString().substring(0, 10).split('-'); //fix local date problems and separate in YYYY-MM-DD
    cards += BookCard(
      {
        id: book.id,
        title: book.title,
        description: book.description,
        author: book.author,
        summary: book.summary,
        publicationDate: setDate[0],
      },
      cardRole
    );
  });
  $cardsContainer.innerHTML = cards; //render cards

  //Components Logic

  BookCardLogic();
  NavbarLogic();

  if (isAdmin(role)) {
    AdminBookCardLogic();
    AdminNavbarLogic();
  }
}
