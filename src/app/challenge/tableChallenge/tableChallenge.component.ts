import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Defi} from '../../defi';

/**
 * @title Table with pagination
 */

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
