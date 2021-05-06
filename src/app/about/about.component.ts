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

}
