import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setData(res:any){
    sessionStorage.setItem('token', res.email);
  }

  getToken(){
    return sessionStorage.getItem('token');
  }

  clear(){
    sessionStorage.clear();
  }
}
