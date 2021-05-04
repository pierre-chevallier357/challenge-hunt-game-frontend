import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

import { Chami } from './../interface/chami';
import { ChamiService } from './../service/chami.service';

@Component({
  selector: 'app-my-Profil',
  templateUrl: './my-Profil.component.html',
  styleUrls: ['./my-Profil.component.scss']
})
export class MyProfilComponent implements OnInit {
  profil!: Chami ;

  constructor(private chamiService: ChamiService, private auth: AngularFireAuth) {}

  ngOnInit() {}

  creation(chami: Chami): void {}

  integer(s: string): number {
    return Number(s);
  }
}
