import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-defi-creator',
  templateUrl: './defi-creator.component.html',
  styleUrls: ['./defi-creator.component.scss']
})
export class DefiCreatorComponent implements OnInit {


  ngOnInit(): void {
  }

  idDefi: number = Math.floor(Math.random() * (10000-100) + 100);

  OnSubmit(){

  }


}
