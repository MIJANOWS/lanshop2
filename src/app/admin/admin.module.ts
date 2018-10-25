import { DataTableModule } from 'angular-6-datatable';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdmOrderIdComponent } from './component/adm-order-id/adm-order-id.component';
import { AdmOrdersComponent } from './component/adm-orders/adm-orders.component';
import { AdmProductsComponent } from './component/adm-products/adm-products.component';
import { ProductFormComponent } from './component/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path:'admin/products/new',component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/products/:id',component: ProductFormComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/products',component: AdmProductsComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/orders',component: AdmOrdersComponent, canActivate:[AuthGuard, AdminAuthGuard]},
      {path:'admin/order/:id',component: AdmOrderIdComponent, canActivate:[AuthGuard, AdminAuthGuard]}
    ])
  ],
  declarations: [
    AdmProductsComponent,
    AdmOrdersComponent,
    AdmOrderIdComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuard,
  ],
})
export class AdminModule { }
