import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  login(data:any){
    return this.http.post('http://localhost:5000/api/login', data);
  }

  saveToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout(){
    localStorage.clear();
  }
}