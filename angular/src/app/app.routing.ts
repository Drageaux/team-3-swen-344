import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./not-found.component";
import { SampleComponent } from "./modules/sample/sample.component";
import { HomeComponent } from "./modules/home/home.component";
import { ClassroomsComponent } from "./modules/classrooms/classrooms.component";

export const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'classrooms', component: ClassroomsComponent },
  { path: '**', component: PageNotFoundComponent } // don't define any route after this line!
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true });
