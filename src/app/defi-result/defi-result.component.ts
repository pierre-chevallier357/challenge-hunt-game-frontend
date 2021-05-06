import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Defi } from '../interface/defi';
import { Question } from '../interface/question';
import { Reponse } from '../interface/reponse';
import { DefiService } from '../service/defi.service';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-defi-result',
  templateUrl: './defi-result.component.html',
  styleUrls: ['./defi-result.component.scss']
})
export class DefiResultComponent implements OnInit {
  reponseListe: Partial<Reponse>[] =<Partial<Reponse>[]>history.state;
  defi$!: Observable<Defi>;
  questions!: Question[];

  resultatCalc = 0;

  constructor(private questionService: QuestionService , private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = Number(routeParams.get('id'));

    this.defi$ = this.defiService.getDefiByidDefi(idDefi);

    console.log(this.reponseListe);

    this.questionService.getQuestionByidDefi(idDefi).subscribe(questions => {
      this.questions = questions;
      for (let i = 0; i < this.reponseListe.length; i++ ){
        if (this.reponseListe[i].reponse === questions[i].secret) {
          this.resultatCalc += questions[i].pointsQuestion;
        }
        if (this.reponseListe[i].indiceUtilise === true){
          this.resultatCalc -= questions[i].pointsQuestion;
        }
      }
      if (this.resultatCalc < 0){
        this.resultatCalc = 0;
      }
    });
  }

  next() {

  }

}
