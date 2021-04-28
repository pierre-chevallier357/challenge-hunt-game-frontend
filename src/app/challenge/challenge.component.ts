import { ChamiService } from '../service/chami.service';
import { DefiService } from '../service/defi.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

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
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  chamisObs:Observable<Chami[]> = this.chamiService.getAllChamis();
  defisObs:Observable<Defi[]> = this.defiService.getAllDefi();

  @Input() auth!: AngularFireAuth;

  constructor(private defiService : DefiService, private chamiService : ChamiService) {
  }
}
