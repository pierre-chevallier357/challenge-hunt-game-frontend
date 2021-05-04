import { Chami } from './chami';
import { Defi } from './defi';
import { Visite } from './visite';

import { Observable } from 'rxjs';

export interface Profil {
  chami : Chami,
  defi$ : Observable<Defi[]>
  visite$ : Observable<Visite[]>
}
