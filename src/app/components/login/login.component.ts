import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
password='';
email='';

constructor(private apiService : ApiService){}

ngOnInit(){
  this.login();
}

  login() {
    this.apiService.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      this.apiService.token = res.token;
    });
  }
}
