import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../interface/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionUrl = 'https://ttg-xi.herokuapp.com/api/question/';

  constructor(private http: HttpClient) {
  }

  getQuestionByidQuestion(idQuestion: number) {
    const url = `${this.questionUrl}${idQuestion}`;

    return this.http.get<Question>(url);
  }

  getAllQuestion() {
    return this.http.get<Question[]>(this.questionUrl);
  }
}
