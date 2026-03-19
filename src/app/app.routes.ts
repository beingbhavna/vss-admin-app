import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LeadsComponent } from './components/leads/leads.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
        path: '',
        // canActivate: [AuthGuard],
        children: [

            { path: 'dashboard', component: DashboardComponent },
            { path: 'leads', component: LeadsComponent },
            { path: 'calendar', component: CalendarComponent }

        ]
    }

];
