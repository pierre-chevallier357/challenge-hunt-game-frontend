import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Arret } from '../interface/arret';

@Injectable({
  providedIn: 'root'
})
export class ArretService {

  private arretUrl = 'https://ttg-xi.herokuapp.com/api/arret/';

  constructor(private http: HttpClient) {
  }

  getArretByidArret(idArret: number) {
    const url = `${this.arretUrl}${idArret}`;

    return this.http.get<Arret>(url);
  }

  getAllArret() {
    return this.http.get<Arret[]>(this.arretUrl);
  }
}
