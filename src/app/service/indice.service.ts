import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Indice } from '../interface/indice';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndiceService {

  private indiceUrl = environment.apiUrl + '/indices/';

  constructor(private http: HttpClient) {
  }

  getByIdIndice(idIndice: number): Observable<Indice> {
    const url = `${this.indiceUrl}${idIndice}`;

    return this.http.get<Indice>(url);
  }

  getAll(): Observable<Indice[]> {
    return this.http.get<Indice[]>(this.indiceUrl);
  }

  create(indice: Partial<Indice>): Observable<Indice> {
    return this.http.post<Indice>(this.indiceUrl, indice);
  }
}
