import { Reponse } from './reponse';

export interface Visite {
  idVisite: number;
  idDefi: number;
  uid: string;
  dateVisite: Date;
  temps: number;
  version: number;
  modeD: string;
  status: string;
  note: number;
  score: number;
  commentaire: string;
  reponses: Partial<Reponse>[];
}
