export class Document {
    uuid: number;
    nomDocument: string;
    typeDocument: string;
    dateCreation: string; // Utiliser un type approprié si vous souhaitez manipuler des dates dans Angular
    metadata: string;
    hashedDocument: string;
    linkDocument: string;
  
    constructor(
      uuid: number,
      nomDocument: string,
      typeDocument: string,
      dateCreation: string,
      metadata: string,
      hashedDocument: string,
      linkDocument: string
    ) {
      this.uuid = uuid;
      this.nomDocument = nomDocument;
      this.typeDocument = typeDocument;
      this.dateCreation = dateCreation;
      this.metadata = metadata;
      this.hashedDocument = hashedDocument;
      this.linkDocument = linkDocument;
    }
  }
  