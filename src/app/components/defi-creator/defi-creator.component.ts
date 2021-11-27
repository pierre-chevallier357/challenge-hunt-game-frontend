import { Defi } from 'src/app/models/defi';
import { Component, OnInit } from '@angular/core';
import { DefiService } from '../../services/defi.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-defi-creator',
  templateUrl: './defi-creator.component.html',
  styleUrls: ['./defi-creator.component.scss'],
})
export class DefiCreatorComponent implements OnInit {
  idDefi!: number;
  defi$!: Observable<Defi>;
  questions$!: Observable<Question[]>;

  constructor(
    private route: ActivatedRoute,
    private defiService: DefiService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.defi$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.idDefi = Number(params.get('id'));
        this.questions$ = this.questionService.getQuestionByidDefi(this.idDefi);
        return this.defiService.getDefiByidDefi(this.idDefi);
      })
    );
  }
}
