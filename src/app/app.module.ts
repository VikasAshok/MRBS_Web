import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenubarComponent } from './component/menubar/menubar.component'
import { LoginComponent } from './component/login/login.component';
import { MeetingroomlistComponent } from './component/meetingroomlist/meetingroomlist.component';
import { BookedmeetinglistComponent } from './component/bookedmeetinglist/bookedmeetinglist.component';
import { BookednewmeetingComponent } from './component/bookednewmeeting/bookednewmeeting.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenubarComponent,
    MeetingroomlistComponent,
    BookedmeetinglistComponent,
    BookednewmeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule ,
    ToastrModule.forRoot({preventDuplicates: true})

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
};

