import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListdocumentComponent } from './Document/listdocument/listdocument.component';
import { UploaddocumentComponent } from './Document/uploaddocument/uploaddocument.component';

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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
