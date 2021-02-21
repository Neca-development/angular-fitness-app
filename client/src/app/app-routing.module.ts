import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { UserComponent } from './user-page/user.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'user/:id', component: UserComponent, canActivate: [UserGuard] },
  {
    path: 'admin/:id',
    component: AdminPageComponent,
    canActivate: [AdminGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
