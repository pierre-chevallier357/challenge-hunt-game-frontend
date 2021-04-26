import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

import { HttpClient } from '@angular/common/http';

export interface ErrorManager {
  ChamisTableErrror : boolean,
  DefisTableErrror : boolean,
}
export interface Chamis {
  login: string,
  age: number,
  nb_defis: number
}
export interface Defi {
  id: string,
  titre: string,
  auteur: string,
  description: string,
  datedecreation: string
}
export interface SearchResultsChamis {
  total: number;
  results: Array<Chamis>;
}


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeComponent{
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;


  chamisObs = this.http.get<Chamis[]>('https://ttg-xi.herokuapp.com/api/chamis/');
  defisObs = this.http.get<Defi[]>('https://ttg-xi.herokuapp.com/api/defis/');

  @Input() auth!: AngularFireAuth;

  errorManager: ErrorManager = ({
    ChamisTableErrror : false,
    DefisTableErrror : false
  });

  //Debug : temporaire
  boutonLogs = false;
  title: any;


  constructor(private http: HttpClient) {
  }


}
