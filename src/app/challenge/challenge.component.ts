import { ChamiService } from '../service/chami.service';
import { DefiService } from '../service/defi.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Chami } from '../interface/chami';
import { Defi } from '../interface/defi';
import { Observable } from 'rxjs';

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
  chamisObs:Observable<Chami[]> = this.chamiService.getAllChamis();
  defisObs:Observable<Defi[]> = this.defiService.getAllDefis();

  @Input() auth!: AngularFireAuth;

  constructor(private defiService : DefiService, private chamiService : ChamiService) {
  }
}
