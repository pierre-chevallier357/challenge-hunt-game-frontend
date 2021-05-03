import { DefiType } from 'src/app/interface/defi';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-defi-creator',
  templateUrl: './defi-creator.component.html',
  styleUrls: ['./defi-creator.component.scss']
})

export class DefiCreatorComponent implements OnInit {

  defiForm!: FormGroup;
  submitted: Boolean= true;
  DefiType = DefiType;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.defiForm = this.formBuilder.group({
    //  titre: ['', Validators.required],
      type:  ['', Validators.required],
   //   auteur: ['', Validators.required],
   //   arrêt: ['', Validators.required],
   //   motsClefs: ['', Validators.required],
   //   duree: ['', Validators.pattern('[1-9]')],
   //   prologue: ['', Validators.required],
   //   description: ['', Validators.required],
    })
  }

  idDefi: number = Math.floor(Math.random() * (10000-100) + 100);

  get f() { return this.defiForm.controls; }

  OnSubmit(){
    this.submitted = true;
    if (this.defiForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.defiForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.defiForm.reset();
}

}
