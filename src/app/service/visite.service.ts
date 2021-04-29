import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visite } from '../interface/visite';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  private visiteUrl = 'https://ttg-xi.herokuapp.com/api/visite/';
  private defiUrl = 'https://ttg-xi.herokuapp.com/api/defis/';

  constructor(private http: HttpClient) {
  }

  getVisiteByidVisite(idVisite: number) {
    const url = `${this.visiteUrl}${idVisite}`;
    return this.http.get<Visite>(url);
  }

    getVisiteByIdDefi(IdDefi: string) {
    const url = `${this.defiUrl}${IdDefi}`+`/visite`;
    return this.http.get<Visite[]>(url);
  }

  getAllVisite() {
    return this.http.get<Visite[]>(this.visiteUrl);
  }
}
