// autorisation.model.ts

import { User } from "./user.model";
import { Document } from './document.model'; // Assurez-vous de l'importer correctement depuis le bon chemin

export interface Autorisation {
    id: number;
    document: Document; // Assurez-vous que le type de document est correctement défini ici
    user: User;
    typeAutorisation: string;
  }
  