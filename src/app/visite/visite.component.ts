import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Visite } from '../interface/visite';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {
  visiteForm!: FormGroup;
  visite!: Partial<Visite>;

  submitted = false;

  @Output() visiteOutput = new EventEmitter<Partial<Visite>>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.visiteForm = this.formBuilder.group({
      temps: ['', Validators.required],
      mode: ['', Validators.required],
      status: ['', Validators.required],
      score: ['', Validators.required],
      note: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
  }

  get f() { return this.visiteForm.controls; }

  OnSubmit(): void {
    this.submitted = true;

    if (this.visiteForm.invalid){
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.visiteForm.value, null, 4));

    this.visite = {
      uid: '1', // TODO AJOUTER L'UID
      dateVisite: new Date(),
      temps: this.visiteForm.get('temps')?.value,
      modeD: this.visiteForm.get('mode')?.value,
      status: this.visiteForm.get('status')?.value,
      note: this.visiteForm.get('note')?.value,
      score: this.visiteForm.get('score')?.value,
      commentaire: this.visiteForm.get('commentaire')?.value,
      // TODO RECUPERER LA LISTE DES REPONSE (Reponse[]) reponses:
    };

    this.visiteOutput.emit(this.visite);
  }

  OnReset(): void {
    this.submitted = false;
    this.visiteForm.reset();
  }
}
