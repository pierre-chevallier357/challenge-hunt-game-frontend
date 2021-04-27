import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

/**
 * @title Table with pagination
 */

export interface Defi {
  id: string;
  titre: string;
  auteur: string;
  description: string;
  datedecreation: string;
}

@Component({
  selector: 'table-challenge',
  styleUrls: ['tableChallenge.component.scss'],
  templateUrl: 'tableChallenge.component.html',
})
export class TableChallengeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titre', 'auteur', 'description', 'datedecreation'];

  @Input() DATA_SOURCE: Defi[] = [];

  ngAfterViewInit() {
  }
}
