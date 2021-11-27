import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Arret } from '../models/arret';
import { environment } from '../../environments/environment';
import { Feature, FeatureCollection, Point } from 'geojson';

@Injectable({
  providedIn: 'root',
})
export class ArretService {
  private arretUrl = environment.apiUrl + '/arrets/';

  constructor(private http: HttpClient) {}

  getArretByIdArret(idArret: number): Observable<Arret> {
    const url = `${this.arretUrl}${idArret}`;

    return this.http.get<Arret>(url);
  }

  getArretByCode(code: string): Observable<Arret> {
    const url = `${this.arretUrl}code/${code}`;

    return this.http.get<Arret>(url);
  }

  getAllArret(): Observable<Arret[]> {
    return this.http.get<Arret[]>(this.arretUrl);
  }

  searchSemStops(query: string): Observable<FeatureCollection<Point>> {
    return this.http.get<FeatureCollection<Point>>(
      'https://data.mobilites-m.fr/api/findType/json?types=arret&query=' + query
    );
  }

  createArret(arret: Partial<Arret>): Observable<Arret> {
    return this.http.post<Arret>(this.arretUrl, arret);
  }

  featureToArret(feature: Feature<Point>): Partial<Arret> {
    return {
      nom: feature.properties?.LIBELLE,
      code: feature.properties?.CODE,
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
    };
  }
}
