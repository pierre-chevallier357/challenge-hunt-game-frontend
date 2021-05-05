import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DefiType, Defi } from 'src/app/interface/defi';
import { ArretService } from 'src/app/service/arret.service';
import { DefiService } from 'src/app/service/defi.service';
import { FeatureCollection, Point } from 'geojson';

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

  constructor(private formBuilder: FormBuilder,
              private defiService: DefiService,
              private arretService: ArretService,) {}

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
  }

}
