import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Defi } from './defi';

@Injectable({
  providedIn: 'root'
})
export class DefiService {

  private defiUrl = 'https://ttg-xi.herokuapp.com/api/defis/';

  constructor(private http: HttpClient) {
  }

  getDefiByidDefi(idDefi: string) {
    const url = `${this.defiUrl}${idDefi}`;

    return this.http.get<Defi>(url);
  }

  getDefiByUid(uid: number) {
    const url = `${this.defiUrl}${uid}`;
    return this.http.get<Defi>(url);
  }

  getAllDefi() {
    return this.http.get<Defi[]>(this.defiUrl);
  }
}
