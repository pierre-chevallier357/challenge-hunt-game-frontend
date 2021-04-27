import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChamiService } from '../chami.service';
import { Chami } from '../chami';
import { DefiService } from '../defi.service';
import { Defi } from '../defi';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})

export class PageProfilComponent implements OnInit {
  chami!: Chami;
  defi = this.http.get<Defi>('https://ttg-xi.herokuapp.com/api/defis/');

  constructor(private chamiService: ChamiService, private defiService: DefiService, private http: HttpClient) {}

  ngOnInit(): void {
    // TODO: décommenter lorsque les routes seront fonctionnelles
    /*const routeParams = this.route.snapshot.paramMap;
    const uid = Number(routeParams.get('uid'));

    this.chamiService.getChamiByUid(1)
      .subscribe(chami => this.chami = chami);*/
    this.chamiService.getChamiByUid(1)
      .subscribe(chami => this.chami = chami); // TODO: à remplacer par le code au dessus
    this.defi = this.defiService.getDefiByUid(1);
  }
}
