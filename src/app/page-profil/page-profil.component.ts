import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ChamiService } from '../service/chami.service';
import { Chami } from '../interface/chami';
import { DefiService } from '../service/defi.service';
import { Profil } from '../interface/profil';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})

export class PageProfilComponent implements OnInit {
  profilDetail$ !:Observable<Profil>;
  selectedId !: number;

  constructor(private chamiService: ChamiService, private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.profilDetail$ = this.route.paramMap.pipe(
      switchMap(params =>
         this.chamiService.getChamiByUid(Number(params.get('uid'))).pipe(
          map((chami:Chami):Profil => ({
            chami : chami,
            defi$ : this.defiService.getDefiByUid(chami.uid)
          }))
        ))
    );
  }
}
