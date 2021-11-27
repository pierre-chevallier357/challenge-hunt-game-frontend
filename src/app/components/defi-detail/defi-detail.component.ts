import { ArretService } from '../../services/arret.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChamiService } from '../../services/chami.service';
import { Chami } from '../../models/chami';
import { DefiService } from '../../services/defi.service';
import { Defi } from '../../models/defi';
import { Visite } from '../../models/visite';
import { VisiteService } from '../../services/visite.service';

import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Arret } from '../../models/arret';

export interface DefiDetail {
  defi: Defi;
  chami$: Observable<Chami>;
  visite$: Observable<Visite[]>;
}

@Component({
  selector: 'app-defi-detail',
  templateUrl: './defi-detail.component.html',
  styleUrls: ['./defi-detail.component.scss'],
})
export class DefiDetailComponent implements OnInit {
  defi!: Defi;
  chami!: Chami;
  visiteObs: Observable<Visite[]> = this.visiteService.getAllVisite();

  defiDetail$!: Observable<DefiDetail>;
  myDefiDetail$!: Observable<DefiDetail>;
  defiObs$ = this.defiService.getAllDefis();
  arretObs$ = this.arretService.getAllArret();

  selectedId!: string;
  ownerDefi: boolean = false;

  constructor(
    private chamiService: ChamiService,
    private defiService: DefiService,
    private visiteService: VisiteService,
    private arretService: ArretService,
    public auth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.defiDetail$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.defiService.getDefiByidDefi(Number(params.get('id'))).pipe(
          map(
            (defi: Defi): DefiDetail => ({
              defi: defi,
              chami$: this.chamiService.getChamiByUid(defi.uid),
              visite$: this.visiteService.getVisiteByIdDefi(defi.idDefi),
            })
          )
        )
      )
    );

    this.myDefiDetail$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.defiService.getDefiByidDefi(Number(params.get('id'))).pipe(
          switchMap(
            (defi: Defi): Observable<DefiDetail> =>
              this.auth.user.pipe(
                map((user): DefiDetail => {
                  if (user?.uid === defi.uid) {
                    this.ownerDefi = true;
                  } else {
                    this.ownerDefi = false;
                  }
                  return {
                    defi: defi,
                    chami$: this.chamiService.getChamiByUid(defi.uid),
                    visite$: this.visiteService.getVisiteByIdDefi(defi.idDefi),
                  };
                })
              )
          )
        )
      )
    );
  }
  // TODO - mettre en service
  async ouvrirPageDefi(idDefi: number): Promise<void> {
    await this.router.navigate([`/defi/${idDefi}`], { relativeTo: this.route });
  }

  // TODO - mettre en service
  getArretByIdA(idA: number, arretData: Arret[]): string {
    const arret: string | undefined = arretData.find(
      (arret: Arret) => arret.idArret === idA
    )?.nom;
    if (arret) {
      return arret;
    } else {
      return 'error';
    }
  }

  nameIt(i: number): string {
    switch (i) {
      case 0:
        return 'insolitement mauvais';
      case 1:
        return 'mauvais';
      case 2:
        return 'pas très bon';
      case 3:
        return 'plutot bon';
      case 4:
        return 'très bon';
      case 5:
        return 'excellent';
      default:
        return 'error';
    }
  }
  nameOfDefi(idDefi: number, defis: Defi[]) {
    const title: string | undefined = defis.find(
      (defi: Defi) => defi.idDefi === idDefi
    )?.titre;
    if (title) {
      return title;
    } else {
      return 'error';
    }
  }
}
