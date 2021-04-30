import { Chami } from '../interface/chami';
import { Defi } from '../interface/defi';

import { Observable } from 'rxjs';

export interface Profil {
  chami : Chami,
  defi$ : Observable<Defi[]>
}
