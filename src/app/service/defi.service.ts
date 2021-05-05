import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Defi } from '../interface/defi';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefiService {

  private defiUrl = environment.apiUrl + '/defis/';
  private chamisUrl = environment.apiUrl + '/chamis/';
  private arretUrl = environment.apiUrl + '/arrets/';

  constructor(private http: HttpClient) {
  }

  getDefiByidDefi(idDefi: number): Observable<Defi> {
    const url = `${this.defiUrl}${idDefi}`;
    return this.http.get<Defi>(url);
  }

  getDefiByUid(uid: string): Observable<Defi[]> {
    const url = `${this.chamisUrl}${uid}/defis`;
    return this.http.get<Defi[]>(url);
  }

  getDefisByIdArret(idArret: number): Observable<Defi[]> {
    const url = `${this.arretUrl}${idArret}/defis`;
    return this.http.get<Defi[]>(url);
  }

  getAllDefis(): Observable<Defi[]>{
    return this.http.get<Defi[]>(this.defiUrl);
  }

  createDefi(defi: Partial<Defi>): Observable<Defi> {
    return this.http.post<Defi>(this.defiUrl, defi);
  }
}
