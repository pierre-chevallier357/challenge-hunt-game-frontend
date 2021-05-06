
import { Arret } from './../../interface/arret';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator }  from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

import { Defi } from 'src/app/interface/defi';
import { Chami } from 'src/app/interface/chami';

export interface  DefiPlus extends Defi {
  pseudo: string,
  arret: string
}


@Component({
  selector: 'table-challenge',
  styleUrls: ['tableChallenge.component.scss'],
  templateUrl: 'tableChallenge.component.html',
})

export class TableChallengeComponent implements AfterViewInit {
  displayedColumns: string[] = ['pseudo', 'arret','titre', 'motsClefs','duree','note', 'tenter'];

  dataSource !:MatTableDataSource<DefiPlus>;

  @Input() DATA_SOURCE:Defi[] = [];
  @Input() chamiData: Chami[] = [];
  @Input() arretData: Arret[] = [];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const DATA_SOURCE_PLUS:DefiPlus[] = this.DATA_SOURCE.map(
      (defi:Defi)=> ({
        ...defi,
        arret : this.getArretByIdA(defi.idArret),
        pseudo : this.getChamisByUid(defi.uid)
      }));


    this.dataSource = new MatTableDataSource<DefiPlus>(DATA_SOURCE_PLUS);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  // TODO - mettre en service
  async ouvrirPageDefi(idDefi: string): Promise<void> {
    await this.router.navigate([`/defi/${idDefi}`], { relativeTo: this.route });
  }

  // TODO - mettre en service
  async ouvrirPageProfil(idProfil: string): Promise<void> {
    await this.router.navigate([`/profil/${idProfil}`], { relativeTo: this.route });
  }

  getChamisByUid(uid: string):string{
    const pseudo:string | undefined = this.chamiData.find((chami:Chami)=>chami.uid === uid)?.pseudo;
    if (pseudo){return pseudo}
    else {return "error"}
  }

  getArretByIdA(idA: number):string{
    const arret:string | undefined = this.arretData.find((arret:Arret)=>arret.idArret === idA)?.nom;
    if (arret){return arret}
    else {return "error"}
  }


}
