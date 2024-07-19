import { BookCard } from "../../../components/book-card/book-card";
import { ApiInteraction } from "../../../controllers/classes";
import './dashboard.css';

export async function Dashboard(){
    const $root = document.getElementById('root') as HTMLDivElement;

    //render view

    $root.innerHTML=`
        <div class="dashboard-container">
            <h1>Libros disponibles</h1>
            <div class="cards-container"></div>
        </div>
    `;

    //view logic

    const $cardsContainer=document.querySelector('.cards-container') as HTMLDivElement;
    const api=new ApiInteraction;
    const books=await api.consultBooks();
    let cards:string='';

    books.forEach(book => {
        const fecha = new Date(book.publicationDate);
        cards+=BookCard({id:book.id,title:book.title,description:book.description,author:book.author,summary:book.summary,publicationDate:String(fecha.getFullYear())});
    });
    $cardsContainer.innerHTML=cards; //render cards


    
}