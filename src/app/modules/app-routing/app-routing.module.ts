import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports:[
    RouterModule.forRoot(routes,{useHash:true})
  ],
  declarations: []
})
export class AppRoutingModule { }
