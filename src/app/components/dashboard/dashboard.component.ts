import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  leads: any[] = [];
  total = 0;
  new = 0;
  contacted = 0;
  closed = 0;

  chartData: ChartData<'doughnut'> = {
    labels: ['New', 'Contacted', 'Closed'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['#3b82f6', '#22c55e', '#ef4444'] }]
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.apiService.getDashboard().subscribe((res: any) => {
      if (res?.leads?.length) {
        this.leads = res.leads;
      } else if (Array.isArray(res)) {
        this.leads = res;
      } else {
        this.leads = [];
      }

      this.calculateStats();
      this.updateChart();
    }, () => {
      // fallback demo
      this.leads = [
        { status: 'New' }, { status: 'Contacted' }, { status: 'Closed' }, { status: 'New' }
      ];
      this.calculateStats();
      this.updateChart();
    });
  }

  calculateStats() {
    this.total = this.leads.length;
    this.new = this.leads.filter(l => l.status === 'New').length;
    this.contacted = this.leads.filter(l => l.status === 'Contacted').length;
    this.closed = this.leads.filter(l => l.status === 'Closed').length;
  }

  updateChart() {
    this.chartData.datasets[0].data = [this.new, this.contacted, this.closed];
  }
}

