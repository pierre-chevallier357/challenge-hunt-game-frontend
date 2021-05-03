import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChamiService } from '../service/chami.service';
import { Chami } from '../interface/chami';
import { DefiService } from '../service/defi.service';
import { Defi } from '../interface/defi';
import { Visite } from '../interface/visite';
import { VisiteService } from '../service/visite.service';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface DefiDetail {
  defi: Defi;
  chami$: Observable<Chami>;
  visite$: Observable<Visite[]>;
}

@Component({
  selector: 'app-defi-detail',
  templateUrl: './defi-detail.component.html',
  styleUrls: ['./defi-detail.component.scss']
})

export class DefiDetailComponent implements OnInit {
  defi!: Defi;
  chami!: Chami;
  visiteObs: Observable<Visite[]> = this.visiteService.getAllVisite();

  defiDetail$ !: Observable<DefiDetail>;
  selectedId !: string;

  constructor(private chamiService: ChamiService,
              private defiService: DefiService,
              private visiteService: VisiteService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.defiDetail$ = this.route.paramMap.pipe(
      switchMap(params =>
         this.defiService.getDefiByidDefi(Number(params.get('id'))).pipe(
          map((defi: Defi): DefiDetail => ({
            defi,
            chami$ : this.chamiService.getChamiByUid(defi.uid),
            visite$ : this.visiteService.getVisiteByIdDefi(defi.idDefi)
          }))
        ))
    );
  }
}
