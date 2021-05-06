import { Question } from 'src/app/interface/question';
import { Reponse } from './reponse';


export interface Visite {
  idVisite: number;
  idDefi: number,
  uid: string;
  dateVisite: Date;
  temps: number;
  version: number;
  modeD: string;
  status: string;
  note: number;
  score: number;
  commentaire: string;
  indices: Partial<Question>[];
  reponses: Reponse[];
}
