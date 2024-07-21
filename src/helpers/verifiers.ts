import { cryptoKey } from "./cryptoKey";
import CryptoJS from "crypto-js";

export function validToken(token:string){
    if(CryptoJS.AES.decrypt(token,cryptoKey).toString(CryptoJS.enc.Utf8).split(".").length===3){ //check the token pattern "xxx.xxx.xxx"
        return true;
    }else{
        return false;
    }
}

export function isAdmin(role:string){
    if(CryptoJS.AES.decrypt(role,cryptoKey).toString(CryptoJS.enc.Utf8)==="admin"){ //check the decrypt role equal to "admin"
        return true;
    }else{
        return false;
    }
}