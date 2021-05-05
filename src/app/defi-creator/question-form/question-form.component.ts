import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Indice } from 'src/app/interface/indice';
import { Question } from 'src/app/interface/question';
import { QuestionIndice } from './question-indice';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  submitted = false;
  laQuestion!: Partial<Question>;
  lIndice!: Partial<Indice>;

  @Input() questionIndiceInput!: QuestionIndice;
  @Output() questionIndiceOutput = new EventEmitter<QuestionIndice>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      pointsqss: ['', Validators.required],
      reponse: ['', Validators.required],
      indice: ['', Validators.required],
      pointsi: ['', Validators.required],
    });
  }

  get g() { return this.questionForm.controls; }

  OnSubmit(){
    this.submitted = true;
    if (this.questionForm.invalid){
      return;
    }

    alert('SUCCESS TWO!! :-)\n\n' + JSON.stringify(this.questionForm.value, null, 4));

    this.laQuestion = {
      question: this.questionForm.get('question')?.value,
      points: this.questionForm.get('pointsqss')?.value,
      secret: this.questionForm.get('question')?.value
    };

    this.lIndice =  {
      description: this.questionForm.get('question')?.value,
      points: this.questionForm.get('pointsi')?.value,
    };

    this.questionIndiceOutput.emit({
      question: this.laQuestion,
      indice: this.lIndice
    })
  }

  onReset() {
    this.submitted = false;
    this.questionForm.reset();
  }
}
