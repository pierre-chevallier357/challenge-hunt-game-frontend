import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Chami } from '../interface/chami';
import { ChamiService } from '../service/chami.service';
import { DefiService } from '../service/defi.service';

import { ArretService } from '../service/arret.service';
import { Arret } from '../interface/arret';

export interface SearchResultsChamis {
  total: number;
  results: Array<Chami>;
}

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChallengeComponent {
  chamisObs = this.chamiService.getAllChamis();
  defisObs = this.defiService.getAllDefis();
  arretsObs = this.arretService.getAllArret();

  constructor(
    private defiService: DefiService,
    private chamiService: ChamiService,
    private arretService: ArretService,
    public auth: AngularFireAuth) {}

  selectArret(arret: Arret): void {
    this.defisObs = this.defiService.getDefisByIdArret(arret.idArret);
  }
}
