import { Observable } from 'rxjs';
import { ChamiService } from './../../service/chami.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator }  from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

import { Defi } from 'src/app/interface/defi';
import { Chami } from 'src/app/interface/chami';

@Component({
  selector: 'table-challenge',
  styleUrls: ['tableChallenge.component.scss'],
  templateUrl: 'tableChallenge.component.html',
})

export class TableChallengeComponent implements AfterViewInit {
  displayedColumns: string[] = ['autheur', 'titre', 'motsClefs', 'description','duree', 'tenter'];

  dataSource !:MatTableDataSource<Defi>;

  @Input() DATA_SOURCE:Defi[] = [];
  @Input() chamiData: Chami[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chamiService: ChamiService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Defi>(this.DATA_SOURCE);
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
    var pseudo:string | undefined = this.chamiData.find((chami:Chami)=>chami.uid === uid)?.pseudo;
    if (pseudo){return pseudo}
    else {return "error"}
  }


}
