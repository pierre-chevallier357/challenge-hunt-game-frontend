import { QuestionService } from '../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { Defi } from '../../models/defi';
import { Observable } from 'rxjs';
import { DefiService } from '../../services/defi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionReponse } from './question-reponse';
import { Visite } from '../../models/visite';
import { VisiteService } from '../../services/visite.service';
import { ReponseService } from '../../services/reponse.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-challenge-accepted',
  templateUrl: './challenge-accepted.component.html',
  styleUrls: ['./challenge-accepted.component.scss'],
})
export class ChallengeAcceptedComponent implements OnInit {
  defi$!: Observable<Defi>;
  idDefi!: number;
  questionsReponses: QuestionReponse[] = [];

  step = 0;
  resultatCalc = 0;

  constructor(
    private questionService: QuestionService,
    private defiService: DefiService,
    private visiteService: VisiteService,
    private reponseService: ReponseService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.idDefi = Number(routeParams.get('id'));
    this.defi$ = this.defiService.getDefiByidDefi(this.idDefi);

    this.questionService
      .getQuestionByidDefi(this.idDefi)
      .subscribe((questions) => {
        questions.map((question) =>
          this.questionsReponses.push({
            question,
            reponse: {
              question: question.idQuestion,
              indiceUtilise: false,
            },
          })
        );
      });
  }

  onSubmit(reponseValue: string, idQuestion: number): void {
    const qrFound = this.questionsReponses.find(
      (qr) => qr.reponse.question === idQuestion
    );

    if (qrFound) {
      const reponse = qrFound.reponse;
      reponse.reponse = reponseValue;
    }
  }

  indiceUsed(indice: string, idQuestion: number): void {
    const qrFound = this.questionsReponses.find(
      (qr) => qr.reponse.question === idQuestion
    );

    if (qrFound) {
      qrFound.reponse.indiceUtilise = true;
      alert('Vous avez utilisez un indice: \n' + indice);
    }
  }

  onSubmitValidey(): void {
    this.step++;

    for (const qr of this.questionsReponses) {
      const question = qr.question;
      const reponse = qr.reponse;

      if (reponse.reponse === question.secret) {
        this.resultatCalc += question.pointsQuestion;
        if (reponse.indiceUtilise === true) {
          this.resultatCalc -= question.pointsIndice;
        }
      }
    }

    if (this.resultatCalc < 0) {
      this.resultatCalc = 0;
    }
  }

  finish(): void {
    this.step++;
  }

  visite(visite: Partial<Visite>, version: number): void {
    visite.idDefi = this.idDefi;
    visite.version = version;
    visite.reponses = [];
    this.questionsReponses.map((qr: QuestionReponse) =>
      visite.reponses?.push(qr?.reponse)
    );

    this.visiteService.create(visite).subscribe((createdVisite) => {
      console.log(createdVisite);

      this.router.navigate(['/']);
    });
  }
}
