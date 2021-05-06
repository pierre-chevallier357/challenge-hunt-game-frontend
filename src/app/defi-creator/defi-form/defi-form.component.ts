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

@Component({
  selector: 'app-defi-form',
  templateUrl: './defi-form.component.html',
  styleUrls: ['./defi-form.component.scss']
})
export class DefiFormComponent implements OnInit {
  defiForm!: FormGroup;
  DefiType = DefiType;
  leDefi!: Partial<Defi>;
  listeQuestion: Partial<Question>[] = [];
  semStops!: Observable<FeatureCollection<Point>>;

  submitted = false;
  incrementation = 0;
  sum = 0;

  @Input() defiInput!: Defi;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private defiService: DefiService,
              private questionService: QuestionService,
              private arretService: ArretService) {}

  ngOnInit(): void {
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

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.defiForm.value, null, 4));

    const selectedArret = this.arretService.featureToArret(this.defiForm.get('arret')?.value);

    this.leDefi = {
      titre: this.defiForm.get('titre')?.value,
      uid: '1', // TODO: RECUPERER SUR LA PAGE
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

      this.defiService.update(this.leDefi.idDefi, this.leDefi as Defi).subscribe(defi => console.log(defi));
    } else {
      this.leDefi.dateCreation = new Date();

      this.defiService.create(this.leDefi).subscribe(defi => {
        console.log(defi);

        for (const question of this.listeQuestion) {
          question.idDefi = defi.idDefi;
          this.questionService.create(question).subscribe();
        }

        this.router.navigate(['defi', defi.idDefi]);
      });
    }
  }

  question(question: Partial<Question>): void {
    this.incrementation += 1;

    question.numero = this.incrementation;

    this.listeQuestion.push(question);

    this.sum += question.pointsQuestion ?? 0;
  }

  onReset(): void {
    this.submitted = false;
    this.defiForm.reset();
  }

  searchSemStops(query: string): void {
    this.semStops = this.arretService.searchSemStops(query);
  }
}
