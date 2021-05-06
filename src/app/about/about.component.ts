import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public auth:AngularFireAuth) { }

  ngOnInit() {
  }
  RayanContact(){
    alert('Voici le contact de KAILI Rayan: "pour vous servir. ": \n\n kailirayan@mailoo.org');
  }
  LeoContact(){
    alert('Voici le contact de PELLET PELLET Léo: "Bonjour,je suis ingénieur informaticien. ": \n\n https://gitlab.com/Leeo97one');
  }

}
