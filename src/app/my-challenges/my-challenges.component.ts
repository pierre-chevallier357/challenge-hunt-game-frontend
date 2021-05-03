import { ChamiService } from './../service/chami.service';
import { DefiService } from './../service/defi.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, OnInit } from '@angular/core';


import { Profil } from '../interface/profil';
import { Defi } from '../interface/defi';
import { Chami } from '../interface/chami';

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.scss']
})

export class MyChallengesComponent implements OnInit {
  @Input() profilObsC!:Profil;

  profilObs$!:Observable<Profil>

  ChamiObs = this.chamiService.getChamiByUid(1);


  constructor(
    private auth:AngularFireAuth,
    private defiService: DefiService,
    private chamiService:ChamiService) {
      this.profilObs$ = this.auth.user.pipe(
        switchMap((user) =>
          this.chamiService.getChamiByUid(1).pipe(
            map((chami:Chami):Profil=> ({
              chami: chami,
              defi$ : this.defiService.getDefiByUid(chami.uid)
            }))
          ))
        );
    }

 get authObs(){
   return this.auth.user;
 }


 get DefiObs(){
  return this.defiService.getDefiByUid(2);
}

  ngOnInit(): void {

  }
}
