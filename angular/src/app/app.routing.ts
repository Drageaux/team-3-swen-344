import { Routes, RouterModule } from "@angular/router";
import { SampleComponent } from "./modules/sample/sample.component";
import { PageNotFoundComponent } from "./not-found.component";
import { DevicesComponent } from "./modules/devices/devices.component";

export const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: 'devices', component: DevicesComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes, { useHash: true });
