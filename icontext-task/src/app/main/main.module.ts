import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportsComponent } from './reports/reports.component';
import { BillingComponent } from './billing/billing.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    InventoryComponent,
    ReportsComponent,
    BillingComponent,
    ProfileComponent,
  ],
  imports: [CommonModule],
  exports: [
    HomeComponent,
    InventoryComponent,
    ReportsComponent,
    BillingComponent,
    ProfileComponent,
  ],
})
export class MainModule {}
