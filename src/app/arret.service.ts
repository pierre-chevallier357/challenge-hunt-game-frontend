import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArretService {

  private arretUrl = 'https://ttg-xi.herokuapp.com/api/arret/';

  constructor(private http: HttpClient) {
  }

  getarretByidArret(idArret: number) {
    const url = `${this.defiUrl}${idArret}`;

    return this.http.get<Arret>(url);
  }

  getAllArret() {
    return this.http.get<arret[]>(this.arretUrl);
  }
}
