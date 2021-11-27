import { AngularFireAuth } from '@angular/fire/auth';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { ChamiService } from './services/chami.service';

export interface ErrorManager {
  ChamisTableError: boolean;
  DefisTableError: boolean;
}

export interface SidebarButton {
  title: string;
  logo: string;
  routerLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';

  sidebar: SidebarButton[] = [
    {
      title: "Page d'accueil",
      logo: 'home',
      routerLink: '/',
    },
    {
      title: 'Chercher un défi',
      logo: 'explore',
      routerLink: '/challenge',
    },
    {
      title: 'Créer un défi',
      logo: 'add_circle',
      routerLink: '/defimaker',
    },
    {
      title: 'Mes visites & défis',
      logo: 'contact_page',
      routerLink: '/myChallenges',
    },
    {
      title: 'À propos',
      logo: 'info',
      routerLink: '/about',
    },
  ];

  title: any; // Debug Visual Studio Code
  events: string[] = [];
  opened!: boolean;

  userConnect$: any;
  unConnected: boolean = true;

  profilConnect$: any;
  accountNotCreated: boolean = true;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private chamiService: ChamiService
  ) {}

  ngOnInit() {
    this.userConnect$ = this.auth.user.pipe(
      map((user) => {
        !user ? (this.unConnected = true) : (this.unConnected = false);
      })
    );

    this.profilConnect$ = this.auth.user.pipe(
      switchMap((user) =>
        this.chamiService.getChamiByUid(user!.uid).pipe(
          map(() => {
            this.accountNotCreated = false;
            console.log(this.accountNotCreated);
          })
        )
      )
    );
  }

  login(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    this.auth.signInWithPopup(provider);
    // Envoyer une requette HTML pour enregister l'utilisateur
  }

  logout(): void {
    this.auth.signOut();
  }

  loadProfil() {
    this.router.navigate(['profil']);
  }
}
