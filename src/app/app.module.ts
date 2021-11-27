import { DefiForm2Component } from './components/defi-detail/defi-form2/defi-form2.component';
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
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChallengeAcceptedComponent } from './components/challenge-accepted/challenge-accepted.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChamiService } from './services/chami.service';
import { DefiCreatorComponent } from './components/defi-creator/defi-creator.component';
import { DefiDetailComponent } from './components/defi-detail/defi-detail.component';
import { DefiService } from './services/defi.service';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { MyChallengesComponent } from './components/my-challenges/my-challenges.component';
import { MyProfilComponent } from './components/my-Profil/my-Profil.component';
import { PageProfilComponent } from './components/page-profil/page-profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableChallengeComponent } from './components/challenge/tableChallenge/tableChallenge.component';

import 'leaflet/dist/images/marker-shadow.png';
import { DefiFormComponent } from './components/defi-creator/defi-form/defi-form.component';
import { QuestionFormComponent } from './components/defi-creator/question-form/question-form.component';
import { VisiteComponent } from './components/visite/visite.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeAcceptedComponent,
    ChallengeComponent,
    DefiCreatorComponent,
    DefiDetailComponent,
    HomeComponent,
    MyChallengesComponent,
    MyProfilComponent,
    MapComponent,
    PageProfilComponent,
    TableChallengeComponent,
    DefiFormComponent,
    QuestionFormComponent,
    VisiteComponent,
    DefiForm2Component,
    AboutComponent,
    MyChallengesComponent,
    TableChallengeComponent,
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
    ReactiveFormsModule,
    YagaModule,
    AngularFireStorageModule,
  ],
  providers: [ChamiService, DefiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
