import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Defi } from '../interface/defi';

@Injectable({
  providedIn: 'root'
})
export class DefiService {

  private defiUrl = 'https://ttg-xi.herokuapp.com/api/defis/';
  private chamisUrl = 'https://ttg-xi.herokuapp.com/api/chamis/';

  constructor(private http: HttpClient) {
  }

  getDefiByidDefi(idDefi: string):Observable<Defi> {
    const url = `${this.defiUrl}${idDefi}`;
    return this.http.get<Defi>(url);
  }

  getDefiByUid(uid: number):Observable<Defi[]> {
    const url = `${this.chamisUrl}${uid}`+`/defis`;
    return this.http.get<Defi[]>(url);
  }

  getAllDefis() :Observable<Defi[]>{
    return this.http.get<Defi[]>(this.defiUrl);
  }
}
