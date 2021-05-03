export enum DefiType{
	fun,
	enigme,
	challenge,
	hardcore,
	franchement_mec
}

export interface Defi {
  idDefi: number;
  idArret: number;
  uid: number;
  titre: string;
  defiType: DefiType;
  dateCreation: Date;
  dateModification: Date;
  versionD: number;
  motsClefs: string;
  points: number;
  duree: number;
  prologue: string;
  description: string;
  epilogue: string;
  commentaire: string;
}
