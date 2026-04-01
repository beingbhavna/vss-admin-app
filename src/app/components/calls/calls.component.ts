import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-calls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.css'
})
export class CallsComponent implements OnInit {
  calls: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadCalls();
  }

  loadCalls() {
    this.apiService.getCalls().subscribe((res: any) => {
      this.calls = res || [];
    });
  }

  markCompleted(call: any) {
    this.apiService.completeCall(call._id).subscribe(() => this.loadCalls());
  }
}
