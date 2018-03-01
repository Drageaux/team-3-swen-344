import { Routes, RouterModule } from "@angular/router";
import { SampleComponent } from "./modules/sample/sample.component";
import { PageNotFoundComponent } from "./not-found.component";
import { ClassroomsComponent } from "./modules/classrooms/classrooms.component";

export const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: 'classrooms', component: ClassroomsComponent },
  { path: '**', component: PageNotFoundComponent } // don't define any route after this line!
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true });
