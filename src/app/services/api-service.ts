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
    return this.http.get(this.api + '/leads', {
      headers: { Authorization: this.token }
    });
  }

  updateStatus(id: any, status: string) {
    return this.http.put(this.api + '/leads/' + id, { status }, {
      headers: { Authorization: this.token }
    });
  }

  booking() {
    this.http.get('/api/bookings').subscribe((data: any) => {
      this.events = data.map((b: any) => ({
        start: new Date(b.date),
        title: b.name
      }));
    });``
  }
}