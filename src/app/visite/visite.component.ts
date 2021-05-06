import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.scss']
})
export class VisiteComponent implements OnInit {

  defiForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.defiForm = this.formBuilder.group({
      temps: ['', Validators.required],
      mode: ['', Validators.required],
      status: ['', Validators.required],
      score: ['', Validators.required],
      note: ['', Validators.required],
      commentaire: ['', Validators.required],
    });
  }

}
