import { AboutComponent } from './components/about/about.component';
import { VisiteComponent } from './components/visite/visite.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengeAcceptedComponent } from './components/challenge-accepted/challenge-accepted.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { DefiCreatorComponent } from './components/defi-creator/defi-creator.component';
import { DefiDetailComponent } from './components/defi-detail/defi-detail.component';
import { HomeComponent } from './components/home/home.component';
import { MyChallengesComponent } from './components/my-challenges/my-challenges.component';
import { MyProfilComponent } from './components/my-Profil/my-Profil.component';
import { PageProfilComponent } from './components/page-profil/page-profil.component';

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
  { path: 'about', component: AboutComponent },
  // Sinon rediriger vers la page principale
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
