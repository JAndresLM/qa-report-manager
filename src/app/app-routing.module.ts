import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { BuildsComponent } from './builds/builds.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent
  },
  {
    path: 'jobs/:id/builds',
    component: BuildsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
