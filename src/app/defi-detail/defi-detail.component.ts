import { DefiService } from './../service/defi.service';
import { Component, OnInit } from '@angular/core';
import { Defi } from '../interface/defi';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-defi-detail',
  templateUrl: './defi-detail.component.html',
  styleUrls: ['./defi-detail.component.scss']
})
export class DefiDetailComponent implements OnInit {

  defi!: Defi;

  constructor(private defiService: DefiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idDefi = String(routeParams.get('idDefi'));
    this.defiService.getDefiByidDefi(idDefi).subscribe(defi => this.defi = defi);
  }

}
