import { Component, OnInit } from '@angular/core';

import { ChamiService } from '../service/chami.service';
import { Chami } from '../interface/chami';
import { DefiService } from '../service/defi.service';
import { Defi } from '../interface/defi';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})

export class PageProfilComponent implements OnInit {
  chami!: Chami;
  defisObs: Observable<Defi[]> = this.defiService.getAllDefi();

  constructor(private chamiService: ChamiService, private defiService: DefiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const uid = Number(routeParams.get('uid'));

    this.chamiService.getChamiByUid(uid)
      .subscribe(chami => this.chami = chami);
    this.defisObs = this.defiService.getDefiByUid(uid);
  }
}
