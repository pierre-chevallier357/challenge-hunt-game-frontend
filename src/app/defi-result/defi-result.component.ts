import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Defi } from '../interface/defi';
import { Question } from '../interface/question';
import { DefiService } from '../service/defi.service';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-defi-result',
  templateUrl: './defi-result.component.html',
  styleUrls: ['./defi-result.component.scss']
})
export class DefiResultComponent implements OnInit {

  defi!: Defi;
  resultatCalc:number = 0;
  questionObs: Observable<Question[]> = this.questionService.getAllQuestion();


  constructor(private questionService: QuestionService ,private defiService: DefiService, private route: ActivatedRoute) {}


  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = Number(routeParams.get('id'));
    this.defiService.getDefiByidDefi(idDefi).subscribe(defi => this.defi = defi);
  }

  next(){

  }

}
