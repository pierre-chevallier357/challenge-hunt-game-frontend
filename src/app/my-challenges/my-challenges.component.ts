import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input, OnInit } from '@angular/core';

import { Chami } from '../interface/chami';
import { ChamiService } from './../service/chami.service';
import { DefiService } from './../service/defi.service';
import { Profil } from '../interface/profil';
import { VisiteService } from './../service/visite.service';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.scss']
})

export class MyChallengesComponent implements OnInit {
  @Input() profilObsC!: Profil;
  profilObs$!: Observable<Profil>

  constructor(private auth: AngularFireAuth, private defiService: DefiService, private chamiService: ChamiService, private visiteService: VisiteService) {
      this.profilObs$ = this.auth.user.pipe(
        switchMap((user) =>
          this.chamiService.getChamiByUid(user!.uid).pipe(
            map((chami:Chami):Profil=> ({
              chami: chami,
              defi$ : this.defiService.getDefiByUid(chami.uid),
              visite$ : this.visiteService.getVisiteByUid(chami.uid)
            }))
          ))
        );
    }

    ngOnInit() {}

    get authObs(){
      return this.auth.user;
    }

    get DefiObs(){
      return this.defiService.getDefiByUid('2');
    }

    get visiteObs(){
      return this.visiteService.getVisiteByUid('2');
    }
}
