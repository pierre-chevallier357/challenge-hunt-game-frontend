import { VisiteService } from './../service/visite.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChamiService } from '../service/chami.service';
import { Chami } from '../interface/chami';
import { DefiService } from '../service/defi.service';
import { Defi } from '../interface/defi';
import { Visite } from '../interface/visite';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface DefiDetail {
  defi : Defi,
  chami$:Observable<Chami>,
  visite$ :Observable<Visite[]>
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

  defiDetail$ !:Observable<DefiDetail>;
  selectedId !: string;

  constructor(private chamiService: ChamiService, private defiService: DefiService, private visiteService: VisiteService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.defiDetail$ = this.route.paramMap.pipe(
      switchMap(params =>
         this.defiService.getDefiByidDefi(String(params.get('id'))).pipe(
          map((defi:Defi):DefiDetail => ({
            defi: defi,
            chami$ : this.chamiService.getChamiByUid(defi.uid),
            visite$ : this.visiteService.getVisiteByIdDefi(defi.idDefi)
          }))
        ))
    );



    /*
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = String(routeParams.get('id'));
    this.defiService.getDefiByidDefi(idDefi).subscribe(defi => {
      this.defi = defi;
      this.chamiService.getChamiByUid(defi.uid).subscribe(chami => this.chami = chami);
      this.visiteObs = this.visiteService.getVisiteByIdDefi(this.defi.idDefi);
    });
    */
  }

}
