import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  private visiteUrl = 'https://ttg-xi.herokuapp.com/api/visite/';

  constructor(private http: HttpClient) {
  }

  getVisiteByidVisite(idVisite: number) {
    const url = `${this.visiteUrl}${idVisite}`;

    return this.http.get<Visite>(url);
  }

  getAllArret() {
    return this.http.get<Visite[]>(this.visiteUrl);
  }
}
