import { AboutComponent } from './about/about.component';
import { VisiteComponent } from './visite/visite.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengeAcceptedComponent } from './challenge-accepted/challenge-accepted.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { DefiCreatorComponent } from './defi-creator/defi-creator.component';
import { DefiDetailComponent } from './defi-detail/defi-detail.component';
import { HomeComponent } from './home/home.component';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';
import { MyProfilComponent } from './my-Profil/my-Profil.component';
import { PageProfilComponent } from './page-profil/page-profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'defi/:id', component: DefiDetailComponent },
  { path: 'defion/:id', component: ChallengeAcceptedComponent },
  { path: 'defimaker', component: DefiCreatorComponent },
  { path: 'defimaker/:id', component: DefiCreatorComponent },
  { path: 'myChallenges', component: MyChallengesComponent },
  { path: 'myProfil', component: MyProfilComponent },
  { path: 'profil/:uid', component: PageProfilComponent },
  { path: 'visite/:id', component: VisiteComponent },
  { path: 'about', component: AboutComponent },

  // Sinon rediriger vers la page principale
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
