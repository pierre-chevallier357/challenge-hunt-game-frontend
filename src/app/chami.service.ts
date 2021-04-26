import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chami } from './chami';

@Injectable({
  providedIn: 'root'
})
export class ChamiService {

  private chamiUrl = 'https://ttg-xi.herokuapp.com/api/chamis/';

  constructor(private http: HttpClient) {
  }

  getChamiByUid(uid: number) {
    const url = `${this.chamiUrl}?${uid}`;

    return this.http.get<Chami>(url);
  }

  getAllChamis() {
    return this.http.get<Chami[]>(this.chamiUrl);
  }
}
