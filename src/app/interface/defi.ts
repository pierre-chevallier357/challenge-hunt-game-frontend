export enum DefiType{
	fun = "fun",
	enigme = "enigme",
	challenge = "challenge",
	hardcore = "hardcore",
	franchement_mec = "franchement_mec"
}

export interface Defi {
  idDefi: number;
  idArret: number;
  uid: string;
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
