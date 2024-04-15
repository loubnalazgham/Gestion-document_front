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

  addAutorisation(autorisation: Autorisation): Observable<Autorisation> {
    return this.http.post<Autorisation>(this.apiUrl, autorisation);
  }
}
