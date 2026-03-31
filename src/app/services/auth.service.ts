import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}

  login(data:any){
    return this.http.post('http://localhost:5000/api/login', data);
  }

  saveToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token'); // ✅ safe
    }
    return null; // SSR me
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  logout(){
    localStorage.clear();
  }
}