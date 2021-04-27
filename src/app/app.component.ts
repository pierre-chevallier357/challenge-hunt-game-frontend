import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import { Router } from '@angular/router';

import firebase from 'firebase/app';

export interface ErrorManager {
  ChamisTableErrror: boolean;
  DefisTableErrror: boolean;
}

export interface SidebarButton {
  title: string;
  logo: string;
  rooterLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  constructor(public auth: AngularFireAuth, private router: Router) {
  }
  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  sidebar: SidebarButton[] = [
    {
      title : 'Page d\'accueil',
      logo: 'home',
      rooterLink: '/'
    },
    {
      title : 'Chercher un défi',
      logo: 'explore',
      rooterLink: '/challenge'
    },
    {
      title : 'Mes Visites & Défis',
      logo: 'contact_page',
      rooterLink: '/myChallenges'
    },
    {
      title : 'Soumettre une idée aux Devs',
      logo: 'lightbulb',
      rooterLink: '/idea'
    }
  ];

  title: any; // debug visualcode

  events: string[] = [];
  opened!: boolean;

  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    this.auth.signInWithPopup(provider);
    // envoyer une requette HTML pour enregister l'utilisateur
  }

  logout(): void {
    this.auth.signOut();
  }

  loadProfil() {
    this.router.navigate(['profil']);
  }

  loadSettings(){}
}
