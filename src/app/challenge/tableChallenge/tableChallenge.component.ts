import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator }  from '@angular/material/paginator';
import { Router, ActivatedRoute, NavigationExtras  } from '@angular/router';

import { Defi } from 'src/app/interface/defi';
import { Observable } from 'rxjs';

@Component({
  selector: 'table-challenge',
  styleUrls: ['tableChallenge.component.scss'],
  templateUrl: 'tableChallenge.component.html',
})

export class TableChallengeComponent implements AfterViewInit {
  displayedColumns: string[] = ['uid', 'titre', 'motsClefs', 'description','duree', 'tenter'];

  dataSource !:MatTableDataSource<Defi>;

  @Input() DATA_SOURCE:Defi[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Defi>(this.DATA_SOURCE);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  // TODO - mettre en service
  async ouvrirPageDefi(idDefi: string): Promise<void> {
    /*
    this.router.navigateByUrl("defis/"+idDefi);
    console.log("ca marche");
    */
    await this.router.navigate([`/defi/${idDefi}`], { relativeTo: this.route });
    //await this.router.navigateByUrl('https://ttg-xi.herokuapp.com/defi/'+idDefi);s
  }

  // TODO - mettre en service
  async ouvrirPageProfil(idProfil: string): Promise<void>{
    await this.router.navigate([`/profil/${idProfil}`], { relativeTo: this.route });
  }
}
