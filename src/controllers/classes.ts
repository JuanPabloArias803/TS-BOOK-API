import { IBook, IUserLogin, IUserRegister } from "../models/interfaces";

export class ApiInteraction{

  readonly domain:string="http://190.147.64.47:5155";

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
      localStorage.setItem("userToken",responseData.data.token); //Save Token in LocalStorage
    } catch(error) {
      alert(error);
    }
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
    }
  }

  //consult all books

  async consultBooks():Promise<IBook[]>{
    let books:IBook[]=[];
    const options={
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem("userToken")}` //recover token from LocalStorage
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
    }
    return books;
  }
}