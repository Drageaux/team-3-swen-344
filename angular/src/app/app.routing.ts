import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./not-found.component";
import { HomeComponent } from "./modules/home/home.component";
import { ClassroomsComponent } from "./modules/classrooms/classrooms.component";
import { DevicesComponent } from "./modules/devices/devices.component";
import { ReservationsComponent} from "./modules/reservations/reservations.component";
import { MessagingComponent } from "./modules/messaging/messaging.component";
import { AuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'classrooms', canActivate: [AuthGuard], component: ClassroomsComponent },
  { path: 'devices', canActivate: [AuthGuard], component: DevicesComponent },
  { path: 'reservations', canActivate: [AuthGuard], component: ReservationsComponent},
  { path: 'messaging', canActivate: [AuthGuard], component: MessagingComponent },
  { path: '**', component: PageNotFoundComponent } // don't define any route after this line!
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
