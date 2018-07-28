import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// RouterModule and Routes  symbols required
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

const arrRoutes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},  // DEFAULT ROUTE
  { path: 'detail/:id', component: HeroDetailComponent},
];
// a route typically has two components: a "path" and a "component"

@NgModule({

  imports: [
    RouterModule.forRoot(arrRoutes)   // initialize router within @NgModule
  ],

  exports: [RouterModule]

  // declarations array below not required since we won't be declaring any components in this MODULE
  // declarations: []
})


export class AppRoutingModule {}
