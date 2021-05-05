import { Indice } from '../interface/indice';
import { Question } from '../interface/question';
import { Defi, DefiType } from 'src/app/interface/defi';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArretService } from '../service/arret.service';
import { Observable } from 'rxjs';
import { FeatureCollection, Point } from 'geojson';
import { HttpErrorResponse } from '@angular/common/http';
import {Arret} from '../interface/arret';
import {DefiService} from '../service/defi.service';
import {QuestionService} from '../service/question.service';
import {IndiceService} from '../service/indice.service';


@Component({
  selector: 'app-defi-creator',
  templateUrl: './defi-creator.component.html',
  styleUrls: ['./defi-creator.component.scss']
})

export class DefiCreatorComponent implements OnInit {

  defiForm!: FormGroup;
  questionForm!: FormGroup;
  submitted = false;
  submitedTwo = false;
  DefiType = DefiType;
  listeQuestion: Partial<Question>[] = [];
  listeIndice: Partial<Indice>[] = [];
  leDefi!: Partial<Defi>;
  incrementation = 0;
  laQuestion!: Partial<Question>;
  lIndice!: Partial<Indice>;
  semStops!: Observable<FeatureCollection<Point>>;

  show!: string;
  sum = 0;

  constructor(private formBuilder: FormBuilder,
              private defiService: DefiService,
              private arretService: ArretService,
              private questionService: QuestionService,
              private indiceService: IndiceService) {}

  ngOnInit(): void {
    this.defiForm = this.formBuilder.group({
      titre: ['', Validators.required],
      type:  ['', Validators.required],
      auteur: ['', Validators.required],
      arret: ['', Validators.required],
      motsClefs: ['', Validators.required],
      duree: ['', Validators.required],
      prologue: ['', Validators.required],
      description: ['', Validators.required],
      epilogue: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      pointsqss: ['', Validators.required],
      reponse: ['', Validators.required],
      indice: ['', Validators.required],
      pointsi: ['', Validators.required],
    }
    );
    this.defiForm.controls['titre'].setValue('Swag');
  }

  get f() { return this.defiForm.controls; }
  get g() { return this.questionForm.controls; }

  OnSubmit(){
    this.submitted = true;
    if (this.defiForm.invalid){
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.defiForm.value, null, 4));

    const selectedArret = this.arretService.featureToArret(this.defiForm.get('arret')?.value);
    // TODO: Vérifier la présence de l'arrêt dans la BDD et l'ajouter si il n'existe pas.
    this.arretService.getArretByCode(selectedArret.code as string).subscribe(
      arret => this.createDefi(arret),
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.arretService.createArret(selectedArret).subscribe(
            arret => this.createDefi(arret)
          );
        }
      }
    );
  }

  createDefi(arret: Arret): void {
    this.leDefi = {
      titre: this.defiForm.get('titre')?.value,
      uid: '1', // TODO: RECUPERER SUR LA PAGE
      defiType: this.defiForm.get('type')?.value,
      dateCreation: new Date(),
      dateModification: new Date(),
      versionD: 1,
      points: this.sum, // TODO: A CALCULER A LA FIN
      motsClefs: this.defiForm.get('motsClefs')?.value,
      duree: this.defiForm.get('duree')?.value,
      idArret: arret.idArret,
      description: this.defiForm.get('descritpion')?.value,
      prologue: this.defiForm.get('prologue')?.value,
      epilogue: this.defiForm.get('epilogue')?.value,
      commentaire: this.defiForm.get('commentaire')?.value,
    };

    this.defiService.createDefi(this.leDefi).subscribe(defi => {
      console.log(defi);

      for (const question of this.listeQuestion) {
        question.idDefi = defi.idDefi;
        this.questionService.create(question).subscribe();
      }

      for (const indice of this.listeIndice) {
        indice.idDefi = defi.idDefi;
        this.indiceService.create(indice).subscribe();
      }
    });
  }

  OnSubmitTwo(){
    this.submitedTwo = true;
    if (this.questionForm.invalid){
      return;
    }

    alert('SUCCESS TWO!! :-)\n\n' + JSON.stringify(this.questionForm.value, null, 4));

    this.incrementation += 1;

    this.laQuestion = {
      question: this.questionForm.get('question')?.value,
      points: this.questionForm.get('pointsqss')?.value,
      secret: this.questionForm.get('question')?.value,
      numero: this.incrementation,
    };

    this.lIndice =  {
      description: this.questionForm.get('question')?.value,
      points: this.questionForm.get('pointsi')?.value,
      numero: this.incrementation,
    };

    this.listeIndice.push(this.lIndice);
    this.listeQuestion.push(this.laQuestion);

    this.sum = this.sum + this.questionForm.get('pointsqss')?.value;
  }

  onReset() {
    this.submitted = false;
    this.defiForm.reset();
}
  onResetTwo(){
    this.submitedTwo = false;
    this.questionForm.reset();
  }

  searchSemStops(query: string): void {
    this.semStops = this.arretService.searchSemStops(query);
  }
}
