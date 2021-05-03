import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Chami } from '../interface/chami';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChamiService {

  private chamiUrl = environment.apiUrl + '/chamis/';

  constructor(private http: HttpClient) {
  }

  getChamiByUid(uid: number): Observable<Chami> {
    const url = `${this.chamiUrl}${uid}`;

    return this.http.get<Chami>(url);
  }

  getAllChamis(): Observable<Chami[]> {
    return this.http.get<Chami[]>(this.chamiUrl);
  }
}
