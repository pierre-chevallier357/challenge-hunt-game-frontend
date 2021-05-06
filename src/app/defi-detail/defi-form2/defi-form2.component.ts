import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Defi } from 'src/app/interface/defi';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-defi-form2',
  templateUrl: './defi-form2.component.html',
  styleUrls: ['./defi-form2.component.scss']
})
export class DefiForm2Component implements OnInit {

  @Input() defi !:Defi;
  @Output() submit :EventEmitter<Defi>= new EventEmitter();

  @ViewChild('title') titleInput!:ElementRef;


  constructor(
    public auth:AngularFireAuth,
    private http:HttpClient) { }

  ngOnInit() {
  }

  submitUpdate(defiPartial:Partial<Defi>){
    if (!defiPartial.titre || !defiPartial.defiType ||
       !defiPartial.motsClefs || !defiPartial.points ||
       !defiPartial.duree){
      alert("remplissez les champs correctement");
    } else {
      const defi = {
        idDefi: this.defi.idDefi,
        idArret: this.defi.idArret,
        uid: this.defi.uid,
        titre: defiPartial.titre,
        defiType: defiPartial.defiType,
        dateCreation: this.defi.dateCreation,
        dateModification: this.defi.dateModification,
        versionD: this.defi.versionD,
        motsClefs: defiPartial.motsClefs,
        points: defiPartial.points,
        duree: defiPartial.duree,
        noteMoyenne: this.defi.noteMoyenne,
        prologue: defiPartial.prologue,
        description: defiPartial.description,
        epilogue: defiPartial.epilogue,
        commentaire: defiPartial.commentaire
      };
      this.http.put(`https://ttg-xi.herokuapp.com/api/defis/${this.defi.idDefi}`,defi).subscribe(
        ()=>document.location.reload(),
        ()=>alert('erreur lors de la création du compte \n ou Vous avez trop appuillé sur le bouton envoyer'));
    }
  }

  integer(i:any){
    return Number(i);
  }

}
