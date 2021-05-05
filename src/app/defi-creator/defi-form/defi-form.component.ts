import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DefiType, Defi } from 'src/app/interface/defi';
import { ArretService } from 'src/app/service/arret.service';
import { FeatureCollection, Point } from 'geojson';
import { HttpErrorResponse } from '@angular/common/http';
import { Arret } from 'src/app/interface/arret';

@Component({
  selector: 'app-defi-form',
  templateUrl: './defi-form.component.html',
  styleUrls: ['./defi-form.component.scss']
})
export class DefiFormComponent implements OnInit {
  defiForm!: FormGroup;
  submitted = false;
  DefiType = DefiType;
  leDefi!: Partial<Defi>;
  semStops!: Observable<FeatureCollection<Point>>;

  sum = 0;

  @Input() defiInput!: Defi;
  @Output() defiOutput = new EventEmitter<Partial<Defi>>();

  constructor(private formBuilder: FormBuilder,
              private arretService: ArretService) {}

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

    this.defiForm.controls['titre'].setValue('Swag');
  }

  get f() { return this.defiForm.controls; }

  OnSubmit(){
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
      dateCreation: new Date(),
      dateModification: new Date(),
      versionD: 1,
      points: this.sum,
      motsClefs: this.defiForm.get('motsClefs')?.value,
      duree: this.defiForm.get('duree')?.value,
      description: this.defiForm.get('descritpion')?.value,
      prologue: this.defiForm.get('prologue')?.value,
      epilogue: this.defiForm.get('epilogue')?.value,
      commentaire: this.defiForm.get('commentaire')?.value,
    };

    this.defiOutput.emit(this.leDefi);
  }

  onReset() {
    this.submitted = false;
    this.defiForm.reset();
  }

  searchSemStops(query: string): void {
    this.semStops = this.arretService.searchSemStops(query);
  }
}
