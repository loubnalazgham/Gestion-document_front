import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListdocumentComponent } from './Document/listdocument/listdocument.component';
import { UploaddocumentComponent } from './Document/uploaddocument/uploaddocument.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ListdocumentComponent },
  { path: 'upload', component: UploaddocumentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListdocumentComponent,
    UploaddocumentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
