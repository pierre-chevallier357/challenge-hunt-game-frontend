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
  listeReponse!: Partial<Reponse>[];
  reponsePartial!: Partial<Reponse>;
  questionObs: Observable<Question[]> = this.questionService.getAllQuestion();

  constructor(private questionService: QuestionService, private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = Number(routeParams.get('id'));
    this.defiService.getDefiByidDefi(idDefi).subscribe(defi => this.defi = defi);
    this.questionObs = this.questionService.getQuestionByidDefi(idDefi);
  }

  onSubmit(reponse: string,idQuestion: number): void {
      this.reponsePartial = {
        question: idQuestion,
        reponse: reponse,
      }
      this.listeReponse.push(this.reponsePartial);
  }

  onSubmitValidey(): void{

  }
}
