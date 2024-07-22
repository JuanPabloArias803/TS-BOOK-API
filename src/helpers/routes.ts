import { CreateBook } from "../views/admin/create-book/create-book";
import { EditBook } from "../views/admin/edit-book/edit-book";
import { BookDetails } from "../views/private/book-details/book-details";
import { Dashboard } from "../views/private/dashboard/dashboard";
import { Login } from "../views/public/login/login";
import { NotFound } from "../views/public/not-found/not-found";
import { Register } from "../views/public/register/register";

export const routes = {
    private: [
        { path: '/dashboard', view: Dashboard},
        { path: '/book-details', view: BookDetails}
    ],
    public: [
        { path: '/login', view: Login},
        { path: '/register', view: Register },
        { path: '/not-found', view: NotFound } 
    ],
    admin:[
        {path:'/dashboard',view:Dashboard},
        { path: '/book-details', view: BookDetails},
        {path:'/create-book',view:CreateBook},
        {path:'/edit-book',view:EditBook}
    ]
};