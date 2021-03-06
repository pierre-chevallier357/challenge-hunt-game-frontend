import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Visite } from '../models/visite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisiteService {
  private visiteUrl = environment.apiUrl + '/visites/';
  private defiUrl = environment.apiUrl + '/defis/';
  private chamisUrl = environment.apiUrl + '/chamis/';

  constructor(private http: HttpClient) {}

  getVisiteByidVisite(idVisite: number): Observable<Visite> {
    const url = `${this.visiteUrl}${idVisite}`;
    return this.http.get<Visite>(url);
  }

  getVisiteByIdDefi(IdDefi: number): Observable<Visite[]> {
    const url = `${this.defiUrl}${IdDefi}` + `/visites`;
    return this.http.get<Visite[]>(url);
  }

  getVisiteByUid(uid: string): Observable<Visite[]> {
    const url = `${this.chamisUrl}${uid}` + `/visites`;
    return this.http.get<Visite[]>(url);
  }

  getAllVisite(): Observable<Visite[]> {
    return this.http.get<Visite[]>(this.visiteUrl);
  }

  create(visite: Partial<Visite>): Observable<Visite> {
    return this.http.post<Visite>(this.visiteUrl, visite);
  }
}
