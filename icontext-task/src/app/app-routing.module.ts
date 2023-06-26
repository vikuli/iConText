import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { ReportsComponent } from './main/reports/reports.component';
import { BillingComponent } from './main/billing/billing.component';
import { ProfileComponent } from './main/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'inventory',
    component: InventoryComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'billing',
    component: BillingComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
