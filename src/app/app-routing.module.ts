import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ObjectsListComponent } from './objects-list/objects-list.component';
import { ObjectsDetailComponent } from './objects-detail/objects-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'ObjectCard/:id', component: ObjectsDetailComponent },
  { path: 'ObjectList', component: ObjectsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
