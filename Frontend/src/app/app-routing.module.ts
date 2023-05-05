import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';
import { AdminComponent } from './admin/admin.component'
import { AddProductComponent } from './add-product/add-product.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', component: LoginComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  {path: 'product/:id', component: SimpleProductComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'addProduct', component: AddProductComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
