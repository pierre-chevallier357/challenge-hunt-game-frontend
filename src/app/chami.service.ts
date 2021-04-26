import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChamiService {

  private chamiUrl = "https://ttg-xi.herokuapp.com/api/chamis/";

  constructor(private http: HttpClient) { }

  getChami(uid: number) {
    const url =
  }
}
