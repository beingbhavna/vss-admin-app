import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent implements OnInit {
  leads: any[] = [];
  search = '';
  status = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadLeads();
  }

  loadLeads() {
    this.apiService.getLeads().subscribe((res: any) => {
      this.leads = Array.isArray(res) ? res : [];
    }, () => {
      this.leads = [{ name: 'Rahul', phone: '9999999999', service: 'Wiring', status: 'New' }];
    });
  }

  update(l: any) {
    this.apiService.updateStatus(l._id, l.status).subscribe(() => this.loadLeads());
  }

  logCall(lead: any) {
    this.apiService.logCall(lead).subscribe(() => {
      this.loadLeads();
    });
  }

  filteredLeads() {
    return this.leads.filter(l =>
      (!this.search || l.name.toLowerCase().includes(this.search.toLowerCase())) &&
      (!this.status || l.status === this.status)
    );
  }
}
