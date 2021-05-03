import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Arret } from '../interface/arret';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArretService {

  private arretUrl = environment.apiUrl + '/arret/';

  constructor(private http: HttpClient) {
  }

  getArretByidArret(idArret: number): Observable<Arret> {
    const url = `${this.arretUrl}${idArret}`;

    return this.http.get<Arret>(url);
  }

  getAllArret(): Observable<Arret[]> {
    return this.http.get<Arret[]>(this.arretUrl);
  }
}
