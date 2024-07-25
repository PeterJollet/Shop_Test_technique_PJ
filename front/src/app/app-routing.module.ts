import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './module/products/component/products/products.component';
import { ProductsAdminComponent } from './module/products/component/products-admin/products-admin.component';
 
const routes: Routes = [{
  path: 'admin/products',
  title: 'Gestion Produit Administrateur',
  component: ProductsAdminComponent},
{
  path: 'products',
  title: 'Liste de Produit ',
  component: ProductsComponent

}]
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
