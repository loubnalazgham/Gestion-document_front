import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8081/documents'; 
  
  constructor(private http: HttpClient) { }

  addDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData);
  }

  getAllDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDocumentById(documentID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${documentID}`);
  }

  getDocumentByHashedDocument(hashedDocument: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hashed/${hashedDocument}`);
  }

  updateDocument(document: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, document);
  }

  deleteDocument(documentID: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${documentID}`);
  }

  getDocumentByNom(nom: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/byNom?nom=${nom}`);
  }

  searchDocuments(nom: string, type: string, date_de_creation: Date): Observable<any[]> {
    let params = '';
    if (nom) params += `&nom=${nom}`;
    if (type) params += `&type=${type}`;
    if (date_de_creation) params += `&date_de_creation=${date_de_creation.toISOString()}`;
    
    if (params.length > 0) {
      params = '?' + params.substr(1);
    }
  
    return this.http.get<any[]>(`${this.apiUrl}/search${params}`);
  }
  

  downloadFile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
  }
}
