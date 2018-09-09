import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOglasComponent } from '../new-oglas/new-oglas.component';
import { HomeComponent } from '../home/home.component';

const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'objavi', component: NewOglasComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
