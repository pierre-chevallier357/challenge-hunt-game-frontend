import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

import firebase from 'firebase/app';

export interface ErrorManager {
  ChamisTableErrror : boolean,
  DefisTableErrror : boolean,
}

export interface Chamis {
  login: string,
  age : number
}

export interface Defi {
  id: string,
  titre: string,
  auteur: string,
  description: string,
  datedecreation: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  //Un chamis est un utilisateur qui a créé des défis
  chamis : Chamis[] = [];
  defis : Defi[] = [];

  errorManager: ErrorManager = ({
    ChamisTableErrror : false,
    DefisTableErrror : false
  });

  //Debug : temporaire
  boutonLogs = false;

  constructor(public auth: AngularFireAuth) {
    this.getChamis();
    this.getDefis();
  }

  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
  }

  logout(): void {
    this.auth.signOut();
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
