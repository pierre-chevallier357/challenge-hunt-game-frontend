import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MultiLineString, FeatureCollection } from 'geojson';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  tileLayerUrl = OSM_TILE_LAYER_URL;
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  geoJSON!: FeatureCollection<MultiLineString>;
  color = '214,122,127'; // TODO: valeur constante temporaire

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<FeatureCollection<MultiLineString>>('https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM')
      .subscribe(json => this.geoJSON = json);
  }
}
