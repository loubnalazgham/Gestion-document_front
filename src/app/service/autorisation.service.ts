import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autorisation } from '../model/autorisation.model';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  private apiUrl = 'http://localhost:8081/autorisations';

  constructor(private http: HttpClient) { }

  addAutorisation(autorisation: Autorisation): Observable<any> {
    return this.http.post<any>(this.apiUrl, autorisation);
  }
  getAllAutorisations(){
    return this.http.get<any[]>(this.apiUrl);
  }
}
