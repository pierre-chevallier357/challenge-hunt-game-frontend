import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

import firebase from 'firebase/app';

export interface User {
  login: string,
  age : number
}

export interface Defi {
  datedecreation: string
  descritption: string
  id: string
  titre: string
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

  users : User[] = [];
  defis : Defi[] = [];
  boutonLogs = false;

  constructor(public auth: AngularFireAuth) {
    this.getUsers();
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

  getUsers(): void {
    fetch('https://ttg-xi.herokuapp.com/api/users/')
    .then(response => response.json())
    .then(users => this.users = users);
  }

  getDefis(): void {
    fetch('https://ttg-xi.herokuapp.com/api/defis/')
    .then(response => response.json())
    .then(defis => this.defis = defis);
  }

  afficherLogs(): void {
    this.boutonLogs = !this.boutonLogs;
  }
}
