import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/document.model';
import { AutorisationService } from 'src/app/service/autorisation.service';
import { User } from 'src/app/model/user.model';
import { $ } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Autorisation } from 'src/app/model/autorisation.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-listdocument',
  templateUrl: './listdocument.component.html',
  styleUrls: ['./listdocument.component.css']
})
export class ListdocumentComponent implements OnInit {
   // Correctly reference the modal template with the @ViewChild
   @ViewChild('detailsModal') detailsModalTemplate: any; // Removed 'static' property
   @ViewChild('shareModal') shareModalTemplate: any;

   @ViewChild('confirmDeleteModal') confirmDeleteModal: any; // Référence au modal de confirmation

  constructor(private router: Router,
              private documentService: DocumentService,
              private modalService: NgbModal,
              private autorisationService: AutorisationService,
              private userservice: UserService) { }
  documents: Document[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  dateSelected: Date; // Assurez-vous que dateSelected est de type Date
  documentTypes: string[] = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Text'];
  // Déclarer une variable pour suivre l'état de la confirmation
  isConfirmationOpen: boolean = false;
  selectedDocument: Document | null = null;
  selectedUsers: User[] = [];
  selectedTypeAutorisation: string = '';

  afficherPopup() {
    console.log("La méthode afficherPopup() est appelée.");
    this.router.navigate(['/upload']);
  }

  ngOnInit() {
    this.getAllDocuments();
    this.loadDocuments();
  }
  
  parseMetadata(metadataString: string): any {
    try {
        return JSON.parse(metadataString);
    } catch (error) {
        console.error('Erreur lors de l\'analyse des métadonnées:', error);
        return null;
    }
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

  openDetails(document: Document) {
    this.selectedDocument = document;
    this.modalService.open(this.detailsModalTemplate).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  // Méthode pour ouvrir le modal de confirmation de suppression
  openConfirmDeleteModal(documentID: number) {
    this.selectedDocument = this.documents.find(document => document.uuid === documentID);
    this.modalService.open(this.confirmDeleteModal).result.then((result) => {
        console.log(`Closed with: ${result}`);
    }, (reason) => {
        console.log(`Dismissed ${reason}`);
    });
}

// Méthode pour confirmer la suppression du document
confirmDelete() {
    if (this.selectedDocument) {
        this.documentService.deleteDocument(this.selectedDocument.uuid).subscribe(
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
    this.modalService.dismissAll(); // Fermer le modal après la suppression
}

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = '';
    this.dateSelected = null; // Réinitialiser à null pour effacer la date sélectionnée
    this.getAllDocuments(); // Appeler la méthode pour récupérer à nouveau toutes les données
  }
  
  search(): void {
    // Conversion de la chaîne de date en objet Date
    const dateObj = this.dateSelected ? new Date(this.dateSelected) : null;
  
    this.documentService.searchDocuments(this.searchTerm, this.selectedType, dateObj)
      .subscribe(
        (response: any[]) => {
          this.documents = response;
        },
        (error) => {
          console.error('Error searching documents:', error);
        }
      );
  }
  
  loadDocuments() {
    this.documentService.getAllDocuments().subscribe(
      (data) => {
        this.documents = data;
      },
      (error) => console.error('Failed to fetch documents', error)
    );
  }

  downloadDocument(id: number) {
    this.documentService.downloadFile(id).subscribe(response => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'filename.ext'; // The filename can be dynamic based on the document details if needed
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
