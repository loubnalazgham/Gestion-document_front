import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListdocumentComponent } from './Document/listdocument/listdocument.component';
import { UploaddocumentComponent } from './Document/uploaddocument/uploaddocument.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


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
    HttpClientModule, // Ajouter HttpClientModule ici
    RouterModule.forRoot(routes),
    FormsModule

  ],
  
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
