import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user-page/user.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'admin/:id', component: AdminPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
