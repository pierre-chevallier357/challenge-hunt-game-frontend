import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Indice } from '../interface/indice';

@Injectable({
  providedIn: 'root'
})
export class IndiceService {

  private indiceUrl = 'https://ttg-xi.herokuapp.com/api/indice/';

  constructor(private http: HttpClient) {
  }

  getIndiceByidIndice(idIndice: number) {
    const url = `${this.indiceUrl}${idIndice}`;

    return this.http.get<Indice>(url);
  }

  getAllArret() {
    return this.http.get<Indice[]>(this.indiceUrl);
  }
}
