import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  leads: any[] = [];
  total = 0;
  new = 0;
  contacted = 0;
  closed = 0;
  chartData = {
    labels: ['New', 'Contacted', 'Closed'],
    datasets: [
      {
        data: [12, 19, 7],
        label: 'Leads'
      }
    ]
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.leads = [
      { status: 'New' },
      { status: 'Contacted' },
      { status: 'Closed' }
    ];

    this.calculateStats();
  }

  calculateStats() {
    this.total = this.leads.length;

    this.new = this.leads.filter(l => l.status === 'New').length;
    this.contacted = this.leads.filter(l => l.status === 'Contacted').length;
    this.closed = this.leads.filter(l => l.status === 'Closed').length;
  }

  getData() {
    this.apiService.getLeads().subscribe((res: any) => {
      this.leads = res;
      const counts: any = {
        New: 0,
        Contacted: 0,
        Closed: 0
      };
      res.forEach((l: any) => {
        if (counts[l.status] !== undefined) {
          counts[l.status]++;
        }
      });
    });
  }
}
