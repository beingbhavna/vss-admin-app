import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LeadsComponent } from './components/leads/leads.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CallsComponent } from './components/calls/calls.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
        path: '',
        canActivate: [AuthGuard],
        children: [

            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'leads', component: LeadsComponent, data: { title: 'Leads' } },
            { path: 'calendar', component: CalendarComponent, data: { title: 'Calendar' } },
            { path: 'calls', component: CallsComponent, data: { title: 'Calls' } },
            { path: 'users', component: UsersComponent, data: { title: 'Users' } }

        ]
    },

    { path: '**', redirectTo: 'dashboard' }

];
