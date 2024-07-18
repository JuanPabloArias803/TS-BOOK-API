import { IUserLogin } from "../controllers/interfaces";

export class ApiInteraction{

  readonly domain:string="http://190.147.64.47:5155";

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
        throw `Error número ${response.status}: ${response.statusText}`;
      }
      const responseData = await response.json();
      localStorage.setItem("userToken",responseData.data.token);
    } catch(err) {
      alert(err);
    }
  }
}