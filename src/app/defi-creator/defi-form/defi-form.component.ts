import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DefiType, Defi } from 'src/app/interface/defi';
import { ArretService } from 'src/app/service/arret.service';
import { FeatureCollection, Point } from 'geojson';
import {Question} from '../../interface/question';
import {HttpErrorResponse} from '@angular/common/http';
import {Arret} from '../../interface/arret';
import {DefiService} from '../../service/defi.service';
import {QuestionService} from '../../service/question.service';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-defi-form',
  templateUrl: './defi-form.component.html',
  styleUrls: ['./defi-form.component.scss']
})
export class DefiFormComponent implements OnInit {
  defiForm!: FormGroup;
  DefiType = DefiType;
  leDefi!: Partial<Defi>;
  questions: Partial<Question>[] = [];
  semStops!: Observable<FeatureCollection<Point>>;

  submitted = false;
  sum = 0;

  @Input() defiInput!: Defi;
  @Input() incrementation = 0;

  uidConnected!: string;
  authObs$!: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private defiService: DefiService,
              private questionService: QuestionService,
              private arretService: ArretService,
              public auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.authObs$ = this.auth.user.pipe(
      map((user) => this.uidConnected = user!.uid)
    );

    this.defiForm = this.formBuilder.group({
      titre: ['', Validators.required],
      type:  ['', Validators.required],
      arret: ['', Validators.required],
      motsClefs: ['', Validators.required],
      duree: ['', Validators.required],
      prologue: ['', Validators.required],
      description: ['', Validators.required],
      epilogue: ['', Validators.required],
      commentaire: ['', Validators.required],
    });

    if (this.defiInput) {
      this.leDefi = this.defiInput;
      this.questionService.getQuestionByidDefi(this.defiInput.idDefi).subscribe(questions => this.questions = questions);

      this.defiForm.controls.titre.setValue(this.leDefi.titre);
      this.defiForm.controls.type.setValue(this.leDefi.defiType);
      this.defiForm.controls.motsClefs.setValue(this.leDefi.motsClefs);
      this.defiForm.controls.duree.setValue(this.leDefi.duree);
      this.defiForm.controls.prologue.setValue(this.leDefi.prologue);
      this.defiForm.controls.description.setValue(this.leDefi.description);
      this.defiForm.controls.epilogue.setValue(this.leDefi.epilogue);
      this.defiForm.controls.commentaire.setValue(this.leDefi.commentaire);
    }
  }

  get f() { return this.defiForm.controls; }

  OnSubmit(): void {
    this.submitted = true;
    if (this.defiForm.invalid){
      return;
    }


    const selectedArret = this.arretService.featureToArret(this.defiForm.get('arret')?.value);

    this.leDefi = {
      titre: this.defiForm.get('titre')?.value,
      uid: this.uidConnected,
      defiType: this.defiForm.get('type')?.value,
      points: this.sum,
      motsClefs: this.defiForm.get('motsClefs')?.value,
      duree: this.defiForm.get('duree')?.value,
      description: this.defiForm.get('description')?.value,
      prologue: this.defiForm.get('prologue')?.value,
      epilogue: this.defiForm.get('epilogue')?.value,
      commentaire: this.defiForm.get('commentaire')?.value,
    };

    this.arretService.getArretByCode(selectedArret.code as string).subscribe(
      arret => this.createOrUpdateDefi(arret),
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.arretService.createArret(selectedArret).subscribe(
            arret => this.createOrUpdateDefi(arret)
          );
        }
      }
    );
  }

  createOrUpdateDefi(arret: Arret): void {
    this.leDefi.idArret = arret.idArret;

    if (this.defiInput) {
      this.leDefi.idDefi = this.defiInput.idDefi;
      this.leDefi.versionD = this.defiInput.versionD + 1;
      this.leDefi.dateCreation = this.defiInput.dateCreation;
      this.leDefi.dateModification = new Date();

      this.defiService.update(this.leDefi.idDefi, this.leDefi as Defi).subscribe(defi => {
        console.log(defi);

        for (const question of this.questions) {
          if (question.idDefi) {
            this.questionService.update(question.idDefi, question as Question).subscribe();
          } else {
            question.idDefi = defi.idDefi;
            this.questionService.create(question).subscribe();
          }
        }

        this.router.navigate(['defi', defi.idDefi]);
      });
    } else {
      this.leDefi.dateCreation = new Date();

      this.defiService.create(this.leDefi).subscribe(defi => {
        console.log(defi);

        for (const question of this.questions) {
          question.idDefi = defi.idDefi;
          this.questionService.create(question).subscribe();
        }

        alert('Visite validée !');
        this.router.navigate(['defi', defi.idDefi]);
      });
    }
  }

  newQuestion(question: Partial<Question>): void {
    this.incrementation += 1;
    question.numero = this.incrementation;
    this.questions.push(question);
  }

  editQuestion(editedQuestion: Partial<Question>): void {
    const editedFullQuestion = editedQuestion as Question;
    const questionFound = this.questions.find(question => question.numero === editedFullQuestion.numero);
    if (questionFound) {
      questionFound.question = editedFullQuestion.question;
      questionFound.secret = editedFullQuestion.secret;
      questionFound.pointsQuestion = editedFullQuestion.pointsQuestion;
      questionFound.indice = editedFullQuestion.indice;
      questionFound.pointsIndice = editedFullQuestion.pointsIndice;
      console.log(questionFound);
    }
    console.log(this.questions);
  }

  onReset(): void {
    this.submitted = false;
    this.defiForm.reset();
  }

  searchSemStops(query: string): void {
    this.semStops = this.arretService.searchSemStops(query);
  }
}
