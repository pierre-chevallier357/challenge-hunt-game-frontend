import { Component, OnInit } from '@angular/core';
import { ChamiService } from '../chami.service';
import { Chami } from '../chami';

@Component({
  selector: 'app-page-profil',
  templateUrl: './page-profil.component.html',
  styleUrls: ['./page-profil.component.scss']
})
export class PageProfilComponent implements OnInit {
  chami?: Chami;

  constructor(private chamiService: ChamiService) {
  }

  ngOnInit(): void {
    // TODO: décommenter lorsque les routes seront fonctionnelles
    /*const routeParams = this.route.snapshot.paramMap;
    const uid = Number(routeParams.get('uid'));

    this.chamiService.getChamiByUid(1)
      .subscribe(chami => this.chami = chami);*/
    this.chamiService.getChamiByUid(1)
      .subscribe(chami => this.chami = chami); // TODO: à remplacer par le code au dessus
  }
}
