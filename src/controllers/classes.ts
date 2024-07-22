import { IBook, ICreateBook, IUserLogin, IUserRegister } from "../models/interfaces";
import CryptoJS from 'crypto-js';
import { cryptoKey } from "../helpers/cryptoKey";

export class ApiInteraction{

  readonly domain:string="http://190.147.64.47:5155"; //static API domain 

  //Login auth user
  
  async authUser(user:IUserLogin):Promise<void>{

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    try {
      const response: Response = await fetch(`${this.domain}/api/v1/auth/login`, options);
      if (!response.ok) {
        throw `Error al iniciar sesión. (${response.status}: ${response.statusText})`;
      }
      const responseData = await response.json();
      sessionStorage.setItem("UT",CryptoJS.AES.encrypt(responseData.data.token, cryptoKey).toString()); //Save encrypted Role in sessionStorage
      sessionStorage.setItem("UR",CryptoJS.AES.encrypt(responseData.data.role, cryptoKey).toString()); //Save encrypted Token in sessionStorage
    } catch(error) {
      alert(error);
    };

  }

  //Register new user

  async createUser(user:IUserRegister):Promise<void>{

    const options={
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(user)
    };

    try {
      const response:Response=await fetch(`${this.domain}/api/v1/users`,options);
      if(!response.ok){
        throw `Error en el registro. (${response.status}: ${response.statusText})`
      }
      alert("Usuario registrado correctamente");
    } catch (error) {
      alert(error)
    };

  }

  //consult all books

  async consultBooks():Promise<IBook[]>{

    let books:IBook[]=[];
    const token:any=sessionStorage.getItem("UT"); //recover token from sessionStorage

    const options={
      method:'GET',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,cryptoKey).toString(CryptoJS.enc.Utf8)}` //decrypt token
      }
    };

    try {
      const response:Response=await fetch(`${this.domain}/api/v1/books`,options);
      if(!response.ok){
        throw `Error inesperado en el sistema. (${response.status}: ${response.statusText})`
      }
      const responseData = await response.json();
      books=responseData.data;
    } catch (error) {
      alert(error)
    };

    return books;
  }

  //consult only one book by id

  async consultOneBook(bookID:string):Promise<IBook>{ 
    let book:IBook={id:'',title:'',author:'',description:'',summary:'',publicationDate:''};
    const token:any=sessionStorage.getItem("UT"); //recover token from sessionStorage

    const options={
      method:'GET',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,cryptoKey).toString(CryptoJS.enc.Utf8)}` //decrypt token
      }
    };

    try {
      const response:Response=await fetch(`${this.domain}/api/v1/books/${bookID}`,options);
      if(!response.ok){
        throw `Error inesperado en el sistema. (${response.status}: ${response.statusText})`
      }
      const responseData = await response.json();
      book=responseData.data;
    } catch (error) {
      alert(error)
    };

    return book;
  }

  //delete a book by id

  async deleteBook(bookID:string):Promise<void>{

    const token:any=sessionStorage.getItem("UT"); //recover token from sessionStorage

    const options={
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,cryptoKey).toString(CryptoJS.enc.Utf8)}` //decrypt token
      }
    };

    try {
      const response:Response=await fetch(`${this.domain}/api/v1/books/${bookID}`,options);
      if(!response.ok){
        throw `Error al eliminar el libro. (${response.status}: ${response.statusText})`
      }
      alert("Libro eliminado correctamente");
    } catch (error) {
      alert(error);
    };
    
  }

  //create new book

  async createBook(book:ICreateBook):Promise<void>{
    const token:any=sessionStorage.getItem("UT"); //recover token from sessionStorage

    const options={
      method:'POST',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,cryptoKey).toString(CryptoJS.enc.Utf8)}`, //decrypt token
        'Content-Type':'application/json'
      },
      body: JSON.stringify(book)
    };

    try {
      const response:Response=await fetch(`${this.domain}/api/v1/books`,options);
      if(!response.ok){
        throw `Error en el registro. (${response.status}: ${response.statusText})`
      }
      alert("Libro creado correctamente");
    } catch (error) {
      alert(error);
    };
  }

  //update a book

  async editBook(book:ICreateBook,bookID:string):Promise<void>{
    const token:any=sessionStorage.getItem("UT"); //recover token from sessionStorage

    const options={
      method:'PATCH',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,cryptoKey).toString(CryptoJS.enc.Utf8)}`, //decrypt token
        'Content-Type':'application/json'
      },
      body: JSON.stringify(book)
    };

    try {
      const response:Response=await fetch(`${this.domain}/api/v1/books/${bookID}`,options);
      if(!response.ok){
        throw `Error en el registro. (${response.status}: ${response.statusText})`
      }
      alert("Libro actualizado");
    } catch (error) {
      alert(error);
    };
  }
  
}