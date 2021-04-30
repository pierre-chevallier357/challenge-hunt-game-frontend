import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Question } from '../interface/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private questionUrl = 'https://ttg-xi.herokuapp.com/api/question/';
  private defiUrl = 'https://ttg-xi.herokuapp.com/api/defis/';

  constructor(private http: HttpClient) {
  }

  getQuestionByidQuestion(idQuestion: number) {
    const url = `${this.questionUrl}${idQuestion}`;
    return this.http.get<Question>(url);
  }

  getQuestionByidDefi(idDefi: string):Observable<Question[]> {
    const url = `${this.defiUrl}${idDefi}`+`/question`;
    return this.http.get<Question[]>(url)
  }

  getAllQuestion() {
    return this.http.get<Question[]>(this.questionUrl);
  }
}
