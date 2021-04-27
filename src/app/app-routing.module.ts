import { IdeaComponent } from './idea/idea.component';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageProfilComponent } from '../app/page-profil/page-profil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'challenge', component: ChallengeComponent },
  { path: 'myChallenges', component: MyChallengesComponent },
  { path: 'idea', component: IdeaComponent },
  { path: 'profil', component: PageProfilComponent },

  // sinon rediriger vers
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
