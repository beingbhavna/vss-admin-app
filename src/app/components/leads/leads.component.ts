import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  update(l: any) {
    console.log('Updated', l);
  }

  logCall(lead: any) {
    alert("Call logged for " + lead.name);
  }
}
