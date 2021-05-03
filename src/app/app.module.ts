import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { YagaModule } from '@yaga/leaflet-ng2';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChamiService } from './service/chami.service';
import { DefiDetailComponent } from './defi-detail/defi-detail.component';
import { DefiService } from './service/defi.service';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { IdeaComponent } from './idea/idea.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MapComponent } from './map/map.component';
import { MyChallengesComponent } from './my-challenges/my-challenges.component';
import { PageProfilComponent } from './page-profil/page-profil.component';
import { TableChallengeComponent } from './challenge/tableChallenge/tableChallenge.component';

import 'leaflet/dist/images/marker-shadow.png';
import { ChallengeAcceptedComponent } from './challenge-accepted/challenge-accepted.component';
import { DefiCreatorComponent } from './defi-creator/defi-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyProfilComponent } from './my-Profil/my-Profil.component';

@NgModule({
  declarations: [	
    AppComponent,
    DefiDetailComponent,
    HomeComponent,
    LeaderboardComponent,
    MyChallengesComponent,
    ChallengeComponent,
    IdeaComponent,
    MapComponent,
    PageProfilComponent,
    TableChallengeComponent,
    ChallengeAcceptedComponent,
    DefiCreatorComponent,
      MyProfilComponent
   ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    YagaModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ChamiService, DefiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
