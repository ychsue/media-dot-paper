import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { TestComponent } from '../../pages/test/test.component';
import { MediaEditComponent } from '../../pages/media-edit/media-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'media-edit/:inUrl', component: MediaEditComponent}
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    // RouterModule.forRoot(routes, {useHash: true})
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
