import { ApiInteraction } from "../../../controllers/classes";

export async function Dashboard(){
    const $root = document.getElementById('root') as HTMLDivElement;

    //render view

    $root.innerHTML=`
        <h1>Dashboard (private)</h1>
    `;

    //view logic

    const api=new ApiInteraction;
    const books=await api.consultBooks();
    console.log(books);
    
}