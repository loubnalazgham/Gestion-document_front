import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-listdocument',
  templateUrl: './listdocument.component.html',
  styleUrls: ['./listdocument.component.css']
})
export class ListdocumentComponent implements OnInit {

  constructor(private router: Router,private documentService: DocumentService,private userService:UserService,private autorusationService:AutorisationService,private toastrService:ToastrService) {
    this.toastrUtils = new  ToastrUtils(this.toastrService);
  }
  documents: Document[] = [];
  users:User[]=[];
  searchTerm: string = '';
  selectedType: string = '';
  dateSelected: Date; // Assurez-vous que dateSelected est de type Date
  documentTypes: string[] = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Text'];
  // Déclarer une variable pour suivre l'état de la confirmation
  isConfirmationOpen: boolean = false;
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

  getAllUsers(){
    return this.userService.getAllUsers().subscribe(
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
    return this.userService.getUserById(id).subscribe(data=>{
      this.selectedUser = data;
      console.log("autorisation ajoutes ! nom ----- = "+this.selectedUser.nom);
    })
  }
  addAutorisation(){
    // this.getUserById(this.selectedUserId);
    return this.userService.getUserById(this.selectedUserId).subscribe(data=>{
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
    return this.autorusationService.addAutorisation(this.autorisation).subscribe(data=>{
      console.log("autorisation ajoutes ! id = "+data.id);
      // Swal.fire('Hello world!');
     });
  }
}

