import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Visite } from '../interface/visite';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {

  visiteForm!: FormGroup;
  submitted = false;
  visite!:Partial<Visite>;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
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

  OnSubmit():void {
    this.submitted = true;
    if (this.visiteForm.invalid){
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.visiteForm.value, null, 4));
  }
  OnReset(){
    this.submitted = false;
    this.visiteForm.reset();
  }

}
