import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Question } from '../interface/question';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  private questionUrl = environment.apiUrl + '/question/';
  private defiUrl = environment.apiUrl + '/defis/';

  constructor(private http: HttpClient) {
  }

  getQuestionByidQuestion(idQuestion: number): Observable<Question> {
    const url = `${this.questionUrl}${idQuestion}`;
    return this.http.get<Question>(url);
  }

  getQuestionByidDefi(idDefi: number): Observable<Question[]> {
    const url = `${this.defiUrl}${idDefi}` + `/questions`;
    return this.http.get<Question[]>(url);
  }

  getAllQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(this.questionUrl);
  }
}
