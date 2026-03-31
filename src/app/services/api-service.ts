import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {

  api = 'http://localhost:5000/api';
  token: any = '';
  events: any;

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(this.api + '/login', data);
  }

  getLeads() {
    return this.http.get(this.api + '/leads');
  }

  updateStatus(id: any, status: string) {
    return this.http.put(this.api + '/leads/' + id, { status });
  }

  booking() {
    this.http.get('/api/bookings').subscribe((data: any) => {
      this.events = data.map((b: any) => ({
        start: new Date(b.date),
        title: b.name
      }));
    });
  }

  dashboard() {
    this.http.get('http://localhost:5000/api/dashboard', {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    }).subscribe(res => {
      console.log(res);
    });
  }
  
    logCall(data: any) {
    const payload = {
      leadId: data._id,
      notes: 'Customer contacted',
      status: 'Contacted'
    }
    return this.http.post(this.api + '/api/calls', payload);
  }
}