import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/document.model';



@Component({
  selector: 'app-listdocument',
  templateUrl: './listdocument.component.html',
  styleUrls: ['./listdocument.component.css']
})
export class ListdocumentComponent implements OnInit {

  constructor(private router: Router,private documentService: DocumentService,) { }
  documents: Document[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  dateSelected: Date; // Assurez-vous que dateSelected est de type Date
  documentTypes: string[] = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Text'];
  // Déclarer une variable pour suivre l'état de la confirmation
  isConfirmationOpen: boolean = false;


  // Variable pour stocker les types de documents

  afficherPopup() {
    console.log("La méthode afficherPopup() est appelée.");
    this.router.navigate(['/upload']);
  }

  ngOnInit() {
    this.getAllDocuments();


  }
  getAllDocuments(): void {
    this.documentService.getAllDocuments()
      .subscribe(
        (response: any[]) => {
          this.documents = response;
        },
        (error) => {
          console.error('Error fetching documents:', error);
        }
      );
  }



  deleteDocument(documentID: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      this.documentService.deleteDocument(documentID).subscribe(
        () => {
          console.log('Document supprimé !');
          // Mettre à jour la liste des documents après la suppression
          this.getAllDocuments();
        },
        (error) => {
          console.error('Erreur lors de la suppression du document :', error);
          // Afficher un message d'erreur à l'utilisateur si nécessaire
        }
      );
    }
  }
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.dateSelected = null; // Réinitialiser à null pour effacer la date sélectionnée
    this.getAllDocuments(); // Appeler la méthode pour récupérer à nouveau toutes les données
  }
  
  

  search(): void {
    this.documentService.searchDocuments(this.searchTerm, this.selectedType, this.dateSelected)
      .subscribe(
        (response: any[]) => {
          this.documents = response;
        },
        (error) => {
          console.error('Error searching documents:', error);
        }
      );
  }
  
}

