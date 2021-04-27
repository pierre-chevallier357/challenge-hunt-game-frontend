export interface Visite{
  uid: number;
  dateVisite: Date;
  temps: number;
  version: number;
  modeD: string;
  status: string;
  note: number;
  score: number;
  commentaire: string;
  indiceUtiliseListe: number[];
  ReponseDonner: string[];
}
