import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewDetailComponent } from './view-detail/view-detail.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent},
  { path: 'add-user', component: AddUserComponent},
  { path: 'view-detail/:_id', component: ViewDetailComponent },
  { path: 'update-user/:_id', component: UpdateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
