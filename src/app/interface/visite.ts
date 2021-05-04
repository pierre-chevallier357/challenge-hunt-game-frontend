export interface Visite {
  idVisite: number;
  uid: number;
  dateVisite: Date;
  temps: number;
  version: number;
  modeD: string;
  status: string;
  note: number;
  score: number;
  commentaire: string;
  indices: number[];
  reponses: string[];
}
