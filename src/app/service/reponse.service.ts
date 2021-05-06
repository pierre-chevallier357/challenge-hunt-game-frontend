import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reponse } from '../interface/reponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReponseService {
  private reponseUrl = environment.apiUrl + '/reponses/';

  constructor(private http: HttpClient) {
  }

  getReponseByquestion(question: number): Observable<Reponse> {
    const url = `${this.reponseUrl}${question}`;
    return this.http.get<Reponse>(url);
  }

  getAllReponses(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(this.reponseUrl);
  }
}
