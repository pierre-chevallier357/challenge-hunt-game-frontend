import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChamiService } from '../service/chami.service';
import { Chami } from '../interface/chami';
import { DefiService } from '../service/defi.service';
import { Defi } from '../interface/defi';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})

export class PageProfilComponent implements OnInit {
  chami!: Chami;
  defisObs: Observable<Defi[]> = this.defiService.getAllDefi();

  constructor(private chamiService: ChamiService, private defiService: DefiService, private http: HttpClient) {}

  ngOnInit(): void {
    // TODO: décommenter lorsque les routes seront fonctionnelles
    /*const routeParams = this.route.snapshot.paramMap;
    const uid = Number(routeParams.get('uid'));

    this.chamiService.getChamiByUid(1)
      .subscribe(chami => this.chami = chami);*/
    this.chamiService.getChamiByUid(1)
      .subscribe(chami => this.chami = chami); // TODO: à remplacer par le code au dessus
    this.defisObs = this.defiService.getDefiByUid(1);
  }
}
