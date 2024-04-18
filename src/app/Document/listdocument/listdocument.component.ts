import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listdocument',
  templateUrl: './listdocument.component.html',
  styleUrls: ['./listdocument.component.css']
})
export class ListdocumentComponent implements OnInit {

  constructor(private router: Router) { }

  afficherPopup() {
    console.log("La méthode afficherPopup() est appelée.");
    this.router.navigate(['/upload']);
  }

  ngOnInit() {
  }

}
