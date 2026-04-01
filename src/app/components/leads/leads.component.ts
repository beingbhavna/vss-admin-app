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
    const query = this.search.trim().toLowerCase();
    return this.leads.filter(l => {
      const matchesSearch = !query ||
        l.name?.toLowerCase().includes(query) ||
        l.phone?.toLowerCase().includes(query) ||
        l.service?.toLowerCase().includes(query) ||
        l.status?.toLowerCase().includes(query);
      const matchesStatus = !this.status || l.status === this.status;
      return matchesSearch && matchesStatus;
    });
  }
}
