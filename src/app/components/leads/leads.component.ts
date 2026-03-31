import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api-service';
@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent {
  leads: any[] = [
    { name: 'Rahul', phone: '9999999999', service: 'Wiring', status: 'New' }
  ];

  search = '';
  status = '';
  constructor(private apiService: ApiService) { }

  update(l: any) {
    console.log('Updated', l);
  }

  logCall(lead: any) {
    this.apiService.logCall(lead).subscribe(res => {

    });
  }

  filteredLeads() {
    return this.leads.filter(l =>(!this.search || l.name.includes(this.search)) && (!this.status || l.status === this.status));
  }
}
