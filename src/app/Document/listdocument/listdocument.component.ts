import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/document.model';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user.model';
import { AutorisationService } from 'src/app/service/autorisation.service';
import { Autorisation } from 'src/app/model/autorisation.model';
import { ToastrUtils } from '../shared/ToastrUtils';
import { ToastrService } from 'ngx-toastr';
// import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
              private userservice: UserService,
              private toastrService:ToastrService) 
              { 
                this.toastrUtils = new  ToastrUtils(this.toastrService);
              }
  documents: Document[] = [];
  users:User[]=[];
  autorisations:Autorisation[] = [];
  searchTerm: string = '';
  selectedType: string = '';
  dateSelected: Date; // Assurez-vous que dateSelected est de type Date
  documentTypes: string[] = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Text'];
  // Déclarer une variable pour suivre l'état de la confirmation
  isConfirmationOpen: boolean = false;
  selectedDocument: Document | null = null;

  selectedUser : User ;
  selectedUserId : number;
  selectedRole : string = '';
  document:Document;
  documentName:string;
  autorisation:Autorisation;
  toastrUtils:ToastrUtils;

  // Variable pour stocker les types de documents

  afficherPopup() {
    console.log("La méthode afficherPopup() est appelée.");
    this.router.navigate(['/upload']);
  }

  ngOnInit() {
    this.getAllDocuments();

    this.getAllUsers();

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
      console.log("loooog == "+this.selectedDocument.uuid)
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


  getAllUsers(){
    return this.userservice.getAllUsers().subscribe(
      (response: any[]) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    )
  }

  getDocument(id:number){
    return this.documentService.getDocumentById(id).subscribe(data=>{
      this.document = data;
      console.log("document :"+ this.document.nomDocument);
      this.documentName = this.document.nomDocument;
    })
  }

  getUserById(id:number){
    return this.userservice.getUserById(id).subscribe(data=>{
      this.selectedUser = data;
      console.log("autorisation ajoutes ! nom ----- = "+this.selectedUser.nom);
    })
  }
  addAutorisation(){
    // this.getUserById(this.selectedUserId);
    return this.userservice.getUserById(this.selectedUserId).subscribe(data=>{
      this.selectedUser = data;
      console.log("autorisation ajoutes ! nom ----- = "+this.selectedUser.nom);
      this.autorisation = {
        id: 1,
        document: this.document,
        user: this.selectedUser,
        typeAutorisation:this.selectedRole,
      };
        console.log("autorisation ajoutes ! document = "+this.document.nomDocument);
        console.log("autorisation ajoutes ! nom = "+this.selectedUser.nom);
        console.log("autorisation ajoutes ! droit = "+this.selectedRole);
        console.log("autorisation ajoutes ! autorisation typeAuto = "+this.autorisation.typeAutorisation);
        this.enregistrerAutorisation();
    })
    
    
  }

  enregistrerAutorisation(){
    return this.autorisationService.addAutorisation(this.autorisation).subscribe(data=>{
      console.log("autorisation ajoutes ! id = "+data.id);
      // Swal.fire('Hello world!');
     });
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

  getAllAotorisations(){
    this.autorisationService.getAllAutorisations().subscribe((response: any[]) => {
      this.autorisations = response;
    },
    (error) => {
      console.error('Error fetching users:', error);
    })
  }

  afficherPopupListe(){
    this.getAllAotorisations();
  }
}

  
  


  

