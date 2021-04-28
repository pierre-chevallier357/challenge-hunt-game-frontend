import { Component, OnInit } from '@angular/core';
import { DefiService } from '../service/defi.service';
import { Observable } from 'rxjs';
import { Defi } from '../interface/defi';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  defisObs:Observable<Defi[]> = this.defiService.getAllDefi();

  constructor(private defiService : DefiService) {}

  ngOnInit(): void {}
}
