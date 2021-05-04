import { Profil } from './../interface/profil';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Chami } from './../interface/chami';
import { ChamiService } from './../service/chami.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-Profil',
  templateUrl: './my-Profil.component.html',
  styleUrls: ['./my-Profil.component.scss']
})
export class MyProfilComponent implements OnInit {
  profil!: Chami ;
  profilObs$!:Observable<Chami>

  @ViewChild('pseudo') pseudoInput!:ElementRef;
  @ViewChild('age') ageInput!:ElementRef;
  @ViewChild('ville') villeInput!:ElementRef;
  @ViewChild('description') descriptionInput!:ElementRef;


  constructor(
    private chamiService: ChamiService,
    private auth: AngularFireAuth,
    private html:HttpClient) {
      this.profilObs$ = this.auth.user.pipe(
        switchMap((user) =>
          this.chamiService.getChamiByUid('1').pipe(
            map((chami:Chami)=>{
              this.pseudoInput.nativeElement.value = chami.pseudo;
              this.ageInput.nativeElement.value = chami.age;
              this.villeInput.nativeElement.value = chami.ville;
              this.descriptionInput.nativeElement.value = chami.description;
              return chami;
            })

          )));
    }

  ngOnInit() {}

  get authObs(){
    return this.auth.user;
  }


  submitCreate(chami: Chami): void {
    if (!chami.pseudo || !chami.age || !chami.ville){
      alert("mauvais arguments");
    } else {
      this.profil = chami;
      //this.html.post('https://ttg-xi.herokuapp.com/api/chami/',chami);
    }
  }

  integer(s: string): number {
    return Number(s);
  }
}
