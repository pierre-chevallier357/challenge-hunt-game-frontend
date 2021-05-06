import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/interface/question';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  questionForm!: FormGroup;
  submitted = false;
  laQuestion!: Partial<Question>;

  @Input() questionInput!: Partial<Question>;
  @Output() questionOutput = new EventEmitter<Partial<Question>>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      pointsqss: ['', Validators.required],
      reponse: ['', Validators.required],
      indice: ['', Validators.required],
      pointsi: ['', Validators.required],
    });

    if (this.questionInput) {
      this.laQuestion = this.questionInput;

      this.questionForm.controls.question.setValue(this.laQuestion.question);
      this.questionForm.controls.pointsqss.setValue(this.laQuestion.pointsQuestion);
      this.questionForm.controls.reponse.setValue(this.laQuestion.secret);
      this.questionForm.controls.indice.setValue(this.laQuestion.indice);
      this.questionForm.controls.pointsi.setValue(this.laQuestion.pointsIndice);
    }
  }

  get g() { return this.questionForm.controls; }

  OnSubmit(): void {
    this.submitted = true;
    if (this.questionForm.invalid){
      return;
    }

    alert('SUCCESS TWO!! :-)\n\n' + JSON.stringify(this.questionForm.value, null, 4));

    this.laQuestion = {
      idQuestion: this.questionInput?.idQuestion,
      numero: this.questionInput?.numero,
      question: this.questionForm.get('question')?.value,
      pointsQuestion: this.questionForm.get('pointsqss')?.value,
      secret: this.questionForm.get('reponse')?.value,
      indice: this.questionForm.get('indice')?.value,
      pointsIndice: this.questionForm.get('pointsi')?.value,
    };

    this.questionOutput.emit(this.laQuestion);
  }

  onReset(): void {
    this.submitted = false;
    this.questionForm.reset();
  }
}
