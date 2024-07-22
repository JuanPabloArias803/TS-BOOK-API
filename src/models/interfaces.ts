export interface IUserLogin{
    email:string,
    password:string
}

export interface IUserRegister{
    name:string,
    lastName: string,
    email: string,
    password: string
}

export interface IBook{
    id:string,
    title:string,
    author:string,
    description:string,
    summary:string,
    publicationDate:string,
}

export interface ICreateBook{
    title:string,
    author:string,
    description:string,
    summary:string,
    publicationDate:string,
}


