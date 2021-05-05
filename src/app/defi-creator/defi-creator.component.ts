import { Defi} from 'src/app/interface/defi';
import { Component, OnInit } from '@angular/core';
import {DefiService} from '../service/defi.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-defi-creator',
  templateUrl: './defi-creator.component.html',
  styleUrls: ['./defi-creator.component.scss']
})

export class DefiCreatorComponent implements OnInit {
  idDefi!: number;
  defi$!: Observable<Defi>;

  constructor(private route: ActivatedRoute, private defiService: DefiService) {}

  ngOnInit(): void {
    this.defi$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.idDefi = Number(params.get('id'));
        return this.defiService.getDefiByidDefi(this.idDefi);
      })
    );
  }
}
