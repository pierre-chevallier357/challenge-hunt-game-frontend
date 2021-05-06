import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OSM_TILE_LAYER_URL, PathOptions } from '@yaga/leaflet-ng2';


import { MultiLineString, FeatureCollection, Feature } from 'geojson';
import { Arret } from '../interface/arret';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  semLines = this.http.get<FeatureCollection<MultiLineString>>('https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM');

  @Input() arrets: Arret[] = [];
  @Output() arret = new EventEmitter<Arret>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  styler(feature: Feature, pathOptions: PathOptions): PathOptions {
    pathOptions.color = 'rgb(' + feature.properties?.COULEUR + ')';

    return pathOptions;
  }

  onMarkerClick(arret: Arret): void {
    console.log(arret);
    this.arret.emit(arret);
  }
}
