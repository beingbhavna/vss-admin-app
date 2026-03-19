import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { addDays } from 'date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  days: number[] = [];
  viewDate: Date = new Date();

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const date = new Date();
    const totalDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    this.days = Array.from({ length: totalDays }, (_, i) => i + 1);
  }

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'Existing Booking'
    }
  ];

  // Add booking
  addBooking(date: Date) {
    const name = prompt("Enter Lead Name");

    if (!name) return;

    this.events = [
      ...this.events,
      {
        start: date,
        title: `Booking: ${name}`
      }
    ];
  }
}
