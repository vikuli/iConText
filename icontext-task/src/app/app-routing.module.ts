import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./main/main.module').then((mod) => mod.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
