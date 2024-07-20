import { IBook, IUserLogin, IUserRegister } from "../models/interfaces";
import CryptoJS from 'crypto-js';

export class ApiInteraction{

  readonly domain:string="http://190.147.64.47:5155"; //static API domain 

  readonly key:string=import.meta.env.VITE_KEY //Simulate server .env variable

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
      localStorage.setItem("UT",CryptoJS.AES.encrypt(responseData.data.token, this.key).toString()); //Save encrypted Role in LocalStorage
      localStorage.setItem("UR",CryptoJS.AES.encrypt(responseData.data.role, this.key).toString()); //Save encrypted Token in LocalStorage
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
    const token:any=localStorage.getItem("UT"); //recover token from LocalStorage

    const options={
      method:'GET',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,this.key).toString(CryptoJS.enc.Utf8)}` //decrypt token
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

  //delete a book by id

  async deleteBook(bookID:string):Promise<void>{

    const token:any=localStorage.getItem("UT"); //recover token from LocalStorage

    const options={
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${CryptoJS.AES.decrypt(token,this.key).toString(CryptoJS.enc.Utf8)}` //decrypt token
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
}