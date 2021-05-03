import { AngularFireAuth } from '@angular/fire/auth';
import { Chami } from './../interface/chami';
import { ChamiService } from './../service/chami.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-Profil',
  templateUrl: './my-Profil.component.html',
  styleUrls: ['./my-Profil.component.scss']
})
export class MyProfilComponent implements OnInit {
  profil !:Chami ;

  constructor(
    private chamiService:ChamiService,
    private auth:AngularFireAuth) { }

  creation(chami:Chami):void{
  }
  integer(s:string):number{
    return Number(s);
  }

  ngOnInit() {
  }


}
