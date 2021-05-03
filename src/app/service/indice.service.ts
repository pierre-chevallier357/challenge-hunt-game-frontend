import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Indice } from '../interface/indice';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndiceService {

  private indiceUrl = environment.apiUrl + '/indice/';

  constructor(private http: HttpClient) {
  }

  getIndiceByidIndice(idIndice: number): Observable<Indice> {
    const url = `${this.indiceUrl}${idIndice}`;

    return this.http.get<Indice>(url);
  }

  getAllArret(): Observable<Indice[]> {
    return this.http.get<Indice[]>(this.indiceUrl);
  }
}
