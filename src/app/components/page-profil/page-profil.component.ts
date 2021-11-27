import { ArretService } from '../../services/arret.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChamiService } from '../../services/chami.service';
import { Chami } from '../../models/chami';
import { DefiService } from '../../services/defi.service';
import { Profil } from '../../models/profil';
import { VisiteService } from '../../services/visite.service';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Arret } from '../../models/arret';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss'],
})
export class PageProfilComponent implements OnInit {
  profilDetail$!: Observable<Profil>;
  arretObs: Observable<Arret[]> = this.arretService.getAllArret();

  constructor(
    private chamiService: ChamiService,
    private defiService: DefiService,
    private route: ActivatedRoute,
    private visiteService: VisiteService,
    private arretService: ArretService
  ) {}

  ngOnInit(): void {
    this.profilDetail$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.chamiService.getChamiByUid(String(params.get('uid'))).pipe(
          map(
            (chami: Chami): Profil => ({
              chami: chami,
              defi$: this.defiService.getDefiByUid(chami.uid),
              visite$: this.visiteService.getVisiteByUid(chami.uid),
            })
          )
        )
      )
    );
  }
}
