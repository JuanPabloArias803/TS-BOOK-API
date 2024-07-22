import './not-found.css';

export function NotFound(){
    const $root = document.getElementById('root') as HTMLDivElement;

    //render view

    $root.innerHTML=`
        <div class="not-found-container">
            <h2>Lo sentimos, la página que buscas no fue encontrada :(</h2>
        </div>
    `;
}
