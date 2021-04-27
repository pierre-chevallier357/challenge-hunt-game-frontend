import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  private reponseUrl = 'https://ttg-xi.herokuapp.com/api/reponse/';

  constructor(private http: HttpClient) {
  }

  getReponseByquestion(question: number) {
    const url = `${this.reponseUrl}${question}`;

    return this.http.get<Reponse>(url);
  }

  getAllArret() {
    return this.http.get<Reponse[]>(this.reponseUrl);
  }
}
