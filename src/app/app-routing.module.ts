import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './component/login/login.component';
import { MeetingroomlistComponent } from './component/meetingroomlist/meetingroomlist.component';
import { BookedmeetinglistComponent } from './component/bookedmeetinglist/bookedmeetinglist.component';
import { BookednewmeetingComponent } from './component/bookednewmeeting/bookednewmeeting.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'menubar', component: MenubarComponent },
  { path :'meetingroomlist',component :MeetingroomlistComponent},
  { path :'bookedmeetinglist',component :BookedmeetinglistComponent},
  { path: 'bookednewmeeting', component : BookednewmeetingComponent},
  { path: 'bookednewmeeting/:id', component: BookednewmeetingComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
