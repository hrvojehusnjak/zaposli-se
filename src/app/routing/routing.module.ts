import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOglasComponent } from '../new-oglas/new-oglas.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { EditOglasComponent } from '../edit-oglas/edit-oglas.component';
import { AuthGuardService } from '../auth-guard.service';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { TermsComponent } from '../terms/terms.component';
import { AboutComponent } from '../about/about.component';
import { FaqComponent } from '../faq/faq.component';

const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'objavi', component: NewOglasComponent },
  { path: 'unos', component: LoginComponent },
  { path: 'edit', component: EditOglasComponent, canActivate: [AuthGuardService], canDeactivate: [CanDeactivateGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'uvjeti', component: TermsComponent },
  { path: 'faq', component: FaqComponent },
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
