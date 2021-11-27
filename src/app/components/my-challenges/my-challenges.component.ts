import { ArretService } from '../../services/arret.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, OnInit } from '@angular/core';

import { Chami } from '../../models/chami';
import { ChamiService } from '../../services/chami.service';
import { DefiService } from '../../services/defi.service';
import { Profil } from '../../models/profil';
import { VisiteService } from '../../services/visite.service';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { Defi } from '../../models/defi';
import { Router, ActivatedRoute } from '@angular/router';
import { Arret } from '../../models/arret';

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.scss'],
})
export class MyChallengesComponent implements OnInit {
  @Input() profilObsC!: Profil;
  profilObs$!: Observable<Profil>;
  defiObs$: Observable<Defi[]> = this.defiService.getAllDefis();
  arretObs$: Observable<Arret[]> = this.arretService.getAllArret();

  constructor(
    private auth: AngularFireAuth,
    private defiService: DefiService,
    private chamiService: ChamiService,
    private visiteService: VisiteService,
    private arretService: ArretService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profilObs$ = this.auth.user.pipe(
      switchMap((user) =>
        this.chamiService.getChamiByUid(user!.uid).pipe(
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

  get authObs() {
    return this.auth.user;
  }

  get DefiObs() {
    return this.defiService.getDefiByUid('2');
  }

  get visiteObs() {
    return this.visiteService.getVisiteByUid('2');
  }

  // TODO - mettre en service
  async ouvrirPageDefi(idDefi: number): Promise<void> {
    await this.router.navigate([`/defi/${idDefi}`], { relativeTo: this.route });
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
