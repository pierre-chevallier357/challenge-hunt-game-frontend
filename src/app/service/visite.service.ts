import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Visite } from '../interface/visite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VisiteService {
  private visiteUrl = environment.apiUrl + '/visite/';
  private defiUrl = environment.apiUrl + '/defis/';

  constructor(private http: HttpClient) {
  }

  getVisiteByidVisite(idVisite: number): Observable<Visite> {
    const url = `${this.visiteUrl}${idVisite}`;
    return this.http.get<Visite>(url);
  }

  getVisiteByIdDefi(IdDefi: number): Observable<Visite[]> {
    const url = `${this.defiUrl}${IdDefi}` + `/visites`;
    return this.http.get<Visite[]>(url);
  }

  getAllVisite(): Observable<Visite[]> {
    return this.http.get<Visite[]>(this.visiteUrl);
  }
}
