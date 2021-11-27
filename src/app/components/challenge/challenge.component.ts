import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Chami } from '../../models/chami';
import { ChamiService } from '../../services/chami.service';
import { DefiService } from '../../services/defi.service';

import { ArretService } from '../../services/arret.service';
import { Arret } from '../../models/arret';
import { map, switchMap } from 'rxjs/operators';
import { Defi } from '../../models/defi';
import { Observable } from 'rxjs';

export interface SearchResultsChamis {
  total: number;
  results: Array<Chami>;
}

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeComponent {
  chamisObs: Observable<Chami[]> = this.chamiService.getAllChamis();
  defisObs: Observable<Defi[]> = this.defiService.getAllDefis();
  arretObs: Observable<Arret[]> = this.arretService.getAllArret();

  arretsObs = this.arretService.getAllArret();

  constructor(
    private defiService: DefiService,
    private chamiService: ChamiService,
    private arretService: ArretService,
    public auth: AngularFireAuth
  ) {}

  selectArret(arret: Arret): void {
    this.defisObs = this.defiService.getDefisByIdArret(arret.idArret);
  }
}
