import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator }  from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Defi } from 'src/app/interface/defi';

@Component({
  selector: 'table-challenge',
  styleUrls: ['tableChallenge.component.scss'],
  templateUrl: 'tableChallenge.component.html',
})

export class TableChallengeComponent implements AfterViewInit {
  displayedColumns: string[] = ['idDefi', 'titre', 'motsClefs', 'description','duree', 'tenter'];

  dataSource !:MatTableDataSource<Defi>;

  @Input() DATA_SOURCE:Defi[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Defi>(this.DATA_SOURCE);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  // NE MARCHE PAS ENCORE
  ouvrirPageDefi(idDefi: string): void {
    /*
    this.router.navigateByUrl("defis/"+idDefi);
    console.log("ca marche");
    */
    this.router.navigateByUrl('https://ttg-xi.herokuapp.com/api/defis/'+idDefi);
  }
}
