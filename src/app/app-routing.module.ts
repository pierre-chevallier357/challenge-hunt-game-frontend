import { ChallengeAcceptedComponent } from './challenge-accepted/challenge-accepted.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengeComponent } from './challenge/challenge.component';
import { DefiDetailComponent } from './defi-detail/defi-detail.component';
import { HomeComponent } from './home/home.component';
import { IdeaComponent } from './idea/idea.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';
import { PageProfilComponent } from './page-profil/page-profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'myChallenges', component: MyChallengesComponent },
  { path: 'idea', component: IdeaComponent },
  { path: 'profil/:uid', component: PageProfilComponent },
  { path: 'defi/:id', component: DefiDetailComponent },
  { path: 'defion/:id', component: ChallengeAcceptedComponent },
  // Sinon rediriger vers la page principale
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
