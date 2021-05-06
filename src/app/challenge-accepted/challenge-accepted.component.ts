import { QuestionService } from '../service/question.service';
import { Component, OnInit } from '@angular/core';
import { Defi } from '../interface/defi';
import { Observable } from 'rxjs';
import { DefiService } from '../service/defi.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../interface/question';
import { Reponse } from '../interface/reponse';


@Component({
  selector: 'app-challenge-accepted',
  templateUrl: './challenge-accepted.component.html',
  styleUrls: ['./challenge-accepted.component.scss']
})
export class ChallengeAcceptedComponent implements OnInit {

  defi!: Observable<Defi>;
  idDefi!: number;
  listeReponse: Partial<Reponse>[] = [];
  reponsePartial!: Partial<Reponse>;
  questions: Question[] = [];


  constructor(private questionService: QuestionService, private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idDefi = Number(routeParams.get('id'));
    this.defi = this.defiService.getDefiByidDefi(this.idDefi);
    this.questionService.getQuestionByidDefi(this.idDefi).subscribe(
      questions => {
        this.questions = questions;
        questions.map(question => this.listeReponse.push({
          question: question.idQuestion
        }
        ));
      }
    );
  }

  onSubmit(reponseValue: string, id: number): void {
    for(let reponse of this.listeReponse){
      if(reponse.question === id){
        reponse.reponse = reponseValue;
        return;
      }
    }
    this.listeReponse.push({
      reponse: reponseValue,
      question: id,
    })
  }

  indiceUsed(idQuestion: number,numero: number): void {
    for(let reponse of this.listeReponse){
      if(reponse.question === idQuestion){
        reponse.indiceUtilise = true;
        alert('Vous avez utilisez un indice: \n' + this.questions[numero-1].indice);
        return;
      }
    }

  }

  onSubmitValidey(): void{

    for(let reponse of this.listeReponse){
      if(reponse.indiceUtilise != true){
        reponse.indiceUtilise = false;
  }
}
}
}
