import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) },
  { path: 'add', loadChildren: () => import('./pages/add/add.module').then( m => m.AddPageModule) },
  { path: 'fav', loadChildren: () => import('./pages/fav/fav.module').then( m => m.FavPageModule) },
  { path: 'detalles/:id', loadChildren: () => import('./pages/detalles/detalles.module').then( m => m.DetallesPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
