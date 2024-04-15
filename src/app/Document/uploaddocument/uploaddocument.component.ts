import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { ToastrUtils } from '../shared/ToastrUtils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploaddocument',
  templateUrl: './uploaddocument.component.html',
  styleUrls: ['./uploaddocument.component.css']
})
export class UploaddocumentComponent implements OnInit {

  fileSelected: boolean = false;
  toastrUtils:ToastrUtils;
  attributes: { key: string, value: string }[] = [];
  metadata :string;
  attributesString :string = "";
  addAttribute() {
    this.attributes.push({ key: '', value: '' });
  }

  constructor(private documentService:DocumentService,private toastrService:ToastrService) {
    this.toastrUtils = new  ToastrUtils(this.toastrService);
   }
 
  ngOnInit() {
  }

  checkFile() {
    const fileInput = document.getElementById('formFile') as HTMLInputElement;
    this.fileSelected = !!fileInput.files && fileInput.files.length > 0;
  }
  
  deposerFichier(fichier: File) {
    if (fichier) {
      this.attributes.forEach((attribute) => {
        const keyAsString: string = attribute.key;
        const valueAsString: string = attribute.value;
        this.attributesString = this.attributesString + "{\"key\":\""+keyAsString+"\",\"value\":\""+valueAsString+"\"},"
        console.log('Clé:', keyAsString, 'Valeur:', valueAsString);
      });
      this.attributesString = this.attributesString.slice(0, -1);
      this.metadata = "{\"metadataSup\":{\"attributes\":["+this.attributesString+"]}}";

      this.documentService.addDocument(this.metadata,fichier).subscribe(() => {
        this.toastrUtils.toastrMsgAddSuccess('Le document');
      },
      (err: HttpErrorResponse) => {
        this.toastrUtils.toastrMsgErrorAlredayExist('Le document');
      });
      // Effectuez ici les opérations que vous souhaitez avec le fichier
      console.log("Fichier récupéré :", fichier);
      // Vous pouvez envoyer le fichier à un service pour traitement, etc.
      
    } else {
      console.log("Aucun fichier sélectionné.");
    }
  }
}

