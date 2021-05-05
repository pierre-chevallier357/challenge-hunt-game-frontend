import { IndiceService } from './../service/indice.service';
import { Indice } from './../interface/indice';
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

  defi!: Defi;
  idDefi!: number;
  listeReponse!: Partial<Reponse>[];
  reponsePartial!: Partial<Reponse>;
  listeIndice!: Partial<Indice>[];
  indicePartial!: Partial<Indice>;
  questionObs: Observable<Question[]> = this.questionService.getAllQuestion();
  indiceObs: Observable<Indice[]> = this.indiceService.getAll();

  constructor(private questionService: QuestionService,private indiceService: IndiceService, private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idDefi = Number(routeParams.get('id'));
    this.defiService.getDefiByidDefi(this.idDefi).subscribe(defi => this.defi = defi);
    this.questionObs = this.questionService.getQuestionByidDefi(this.idDefi);
  }

  onSubmit(reponse: string,idQuestion: number): void {
      this.reponsePartial = {
        question: idQuestion,
        reponse: reponse,
      }
      this.listeReponse.push(this.reponsePartial);
  }

  indiceUsed(indice: string,points: number,id: number,numero: number):void{
    this.indicePartial = {
      idDefi: this.idDefi,
      idIndice: id,
      numero: numero,
      description: indice,
      points: points,
    };
    alert('VOus avez utilisez un indice: \n\n' + indice);
    this.listeIndice.push(this.indicePartial);
  }

  onSubmitValidey(): void{

  }
}
