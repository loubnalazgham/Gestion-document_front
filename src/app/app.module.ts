import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListdocumentComponent } from './Document/listdocument/listdocument.component';
import { UploaddocumentComponent } from './Document/uploaddocument/uploaddocument.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: ListdocumentComponent },
  { path: 'upload', component: UploaddocumentComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    ListdocumentComponent,
    UploaddocumentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgbModalModule


  ],
  
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
