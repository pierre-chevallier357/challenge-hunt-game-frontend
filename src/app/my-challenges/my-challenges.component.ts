import { Component, Input, OnInit } from '@angular/core';

import { Profil } from '../interface/profil';

@Component({
  selector: 'app-my-challenges',
  templateUrl: './my-challenges.component.html',
  styleUrls: ['./my-challenges.component.scss']
})

export class MyChallengesComponent implements OnInit {
  @Input() profilObsC!:Profil;

  constructor() {}

  ngOnInit(): void {}
}
