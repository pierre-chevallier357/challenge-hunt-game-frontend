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

  reponseListe: Partial<Reponse>[] = [];
  defi!: Defi;
  resultatCalc:number = 0;
  questionObs!: Observable<Question[]>;
  questionListe!: Question[][];

  constructor(private questionService: QuestionService ,private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = Number(routeParams.get('id'));
    this.defiService.getDefiByidDefi(idDefi).subscribe(defi => this.defi = defi);
    this.questionObs = this.questionService.getQuestionByidDefi(idDefi);
    this.questionService.getQuestionByidDefi(idDefi).subscribe(questions => {
      for(let i=0; i < this.reponseListe.length; i++ ){
        if(this.reponseListe[i].reponse === questions[i].secret)
        this.resultatCalc += questions[i].pointsQuestion;
        if(this.reponseListe[i].indiceUtilise === true){
          this.resultatCalc -= questions[i].pointsQuestion;
        }
      }
    });

    this.reponseListe.push({
      question: 1,
      reponse: 'Ça dépend',
      indiceUtilise: false,
    });

    this.reponseListe.push({
      question: 2,
      reponse: 'Ba bi bo',
      indiceUtilise: true,
    });
  }

  next(){

  }

}
