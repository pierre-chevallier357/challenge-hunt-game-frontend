import { Component, OnInit } from '@angular/core';

import { Defi } from '../interface/defi';
import { DefiService } from '../service/defi.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

}
