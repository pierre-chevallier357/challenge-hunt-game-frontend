import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Defi } from '../interface/defi';
import { Visite } from '../interface/visite';
import { DefiService } from '../service/defi.service';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {

  visiteForm!: FormGroup;
  submitted = false;
  visite!:Partial<Visite>;
  defi!: Defi;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private defiService: DefiService) { }

  ngOnInit() {
    this.visiteForm = this.formBuilder.group({
      temps: ['', Validators.required],
      mode: ['', Validators.required],
      status: ['', Validators.required],
      score: ['', Validators.required],
      note: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = Number(routeParams.get('id'));
    this.defiService.getDefiByidDefi(idDefi).subscribe(defi => this.defi = defi);
  }

  get f() { return this.visiteForm.controls; }

  OnSubmit():void {
    this.submitted = true;
    if (this.visiteForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.visiteForm.value, null, 4));
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = Number(routeParams.get('id'));
    this.visite={
      idDefi: idDefi,
      uid: '900', //TODO AJOUTER L'UID
      dateVisite: new Date(),
      temps: this.visiteForm.get('temps')?.value,
      version: this.defi.versionD,
      modeD: this.visiteForm.get('mode')?.value,
      status: this.visiteForm.get('status')?.value,
      note: this.visiteForm.get('note')?.value,
      score: this.visiteForm.get('score')?.value,
      commentaire: this.visiteForm.get('commentaire')?.value,
      //TODO RECUPERER LA LISTE DES INDICE (Partial<Question>[]) indices:
      //TODO RECUPERER LA LISTE DES REPONSE (Reponse[]) reponses:
    }
  }
  OnReset(){
    this.submitted = false;
    this.visiteForm.reset();
  }

}
