import { Profil } from '../../models/profil';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chami } from '../../models/chami';
import { ChamiService } from '../../services/chami.service';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-my-Profil',
  templateUrl: './my-Profil.component.html',
  styleUrls: ['./my-Profil.component.scss'],
})
export class MyProfilComponent implements OnInit {
  profilObs$!: Observable<Chami>;

  @ViewChild('pseudo') pseudoInput!: ElementRef;
  @ViewChild('age') ageInput!: ElementRef;
  @ViewChild('ville') villeInput!: ElementRef;
  @ViewChild('description') descriptionInput!: ElementRef;

  ville: string = 'toto';
  connected: boolean = false;

  constructor(
    private chamiService: ChamiService,
    private auth: AngularFireAuth,
    private html: HttpClient
  ) {}

  ngOnInit() {
    this.profilObs$ = this.auth.user.pipe(
      switchMap((user) =>
        this.chamiService.getChamiByUid(user!.uid).pipe(
          catchError(() => console.log),
          map((chami: Chami) => {
            this.pseudoInput.nativeElement.value = chami.pseudo;
            this.ageInput.nativeElement.value = chami.age;
            this.villeInput.nativeElement.value = chami.ville;
            this.descriptionInput.nativeElement.value = chami.description;
            this.connected = true;
            return chami;
          })
        )
      )
    );
  }

  get authObs() {
    return this.auth.user;
  }

  submitCreate(chami: Chami): void {
    if (!chami.pseudo || !chami.age || !chami.ville) {
      alert('mauvais arguments');
    } else {
      this.html
        .post('https://ttg-xi.herokuapp.com/api/chamis/', chami)
        .subscribe(
          () => document.location.reload(),
          () =>
            alert(
              'erreur lors de la création du compte \n ou vous avez trop appuillé sur le bouton envoyer'
            )
        );
    }
  }

  submitUpdate(chami: Chami): void {
    if (!chami.pseudo || !chami.age || !chami.ville) {
      alert('mauvais arguments');
    } else {
      this.html
        .put(`https://ttg-xi.herokuapp.com/api/chamis/${chami.uid}`, chami)
        .subscribe(
          () => document.location.reload(),
          () =>
            alert(
              'erreur lors de la modification du compte \n ou vous avez trop appuillé sur le bouton envoyer'
            )
        );
    }
  }

  integer(s: string): number {
    return Number(s);
  }
}
