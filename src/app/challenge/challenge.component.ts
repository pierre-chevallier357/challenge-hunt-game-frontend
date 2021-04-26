import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

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


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeComponent {
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  chamis : Chamis[] = [];
  defis : Defi[] = [];

  @Input() auth!: AngularFireAuth;

  errorManager: ErrorManager = ({
    ChamisTableErrror : false,
    DefisTableErrror : false
  });

  //Debug : temporaire
  boutonLogs = false;
  title: any;


  constructor() {
    this.getChamis();
    this.getDefis();
  }

  getChamis(): void {
      fetch('https://ttg-xi.herokuapp.com/api/chamis/')
      .then(response => response.json())
      .then(chamisFromServer => {this.chamis = chamisFromServer })
      .catch(error           => {this.errorManager.ChamisTableErrror = true  ; console.log(error)  });
  }

  getDefis(): void {
    fetch('https://ttg-xi.herokuapp.com/api/defis/')
    .then(response => response.json())
    .then(defisFromServer => {this.defis = defisFromServer })
    .catch(error          => {this.errorManager.DefisTableErrror = true  ; console.log(error) });
  }
  //Debug : temporaire
  afficherLogs(): void {
    this.boutonLogs = !this.boutonLogs;
  }

}
