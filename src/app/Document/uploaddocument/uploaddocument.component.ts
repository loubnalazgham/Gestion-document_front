import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploaddocument',
  templateUrl: './uploaddocument.component.html',
  styleUrls: ['./uploaddocument.component.css']
})
export class UploaddocumentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  importerDocument(files: FileList) {

    console.log(files);
  }

}
