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

  constructor(private http: HttpClient) {
  }

  getDefiByidDefi(idDefi: string): Observable<Defi> {
    const url = `${this.defiUrl}${idDefi}`;
    return this.http.get<Defi>(url);
  }

  getDefiByUid(uid: number): Observable<Defi[]> {
    const url = `${this.chamisUrl}${uid}` + `/defis`;
    return this.http.get<Defi[]>(url);
  }

  getAllDefis(): Observable<Defi[]>{
    return this.http.get<Defi[]>(this.defiUrl);
  }
}
