import { Routes, RouterModule } from "@angular/router";
import { SampleComponent } from "./modules/sample/sample.component";
import { PageNotFoundComponent } from "./not-found.component";

export const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true });
