import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'VSS CRM';
  showLayout = true;

  constructor(
    private router: Router,
    private titleService: Title,
    private meta: Meta,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !event.urlAfterRedirects.includes('/login');

        let pageTitle = 'VSS CRM';
        if (event.urlAfterRedirects.includes('/dashboard')) pageTitle = 'Dashboard • VSS CRM';
        else if (event.urlAfterRedirects.includes('/leads')) pageTitle = 'Leads • VSS CRM';
        else if (event.urlAfterRedirects.includes('/calendar')) pageTitle = 'Calendar • VSS CRM';
        else if (event.urlAfterRedirects.includes('/calls')) pageTitle = 'Calls • VSS CRM';
        else if (event.urlAfterRedirects.includes('/users')) pageTitle = 'Users • VSS CRM';
        else if (event.urlAfterRedirects.includes('/login')) pageTitle = 'Login • VSS CRM';

        this.titleService.setTitle(pageTitle);
        this.meta.updateTag({ name: 'description', content: 'VSS CRM: lightweight admin dashboard for customer and calendar management' });
        this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
