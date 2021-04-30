import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

import { MultiLineString, FeatureCollection } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  geoJSON = this.http.get<FeatureCollection<MultiLineString>>('https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }
}
