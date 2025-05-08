import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Case } from '../model/case';
import { MapComponent, GeoJSONSourceComponent, FeatureComponent, LayerComponent, MarkerComponent, PopupComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike, StyleSpecification } from 'maplibre-gl';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [MapComponent, GeoJSONSourceComponent, FeatureComponent, LayerComponent, MarkerComponent, PopupComponent, ButtonModule, DividerModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class CaseComponent {
  // MapLibre style object
  public style: StyleSpecification = {
    "version": 8,
    "sources": {
      "osm": {
        "type": "raster",
        "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        "tileSize": 256,
        "attribution": "&copy; OpenStreetMap Contributors",
        "maxzoom": 19
      }
    },
    "layers": [
      {
        "id": "osm",
        "type": "raster",
        "source": "osm"
      }
    ]
  };

  constructor(private http: HttpClient) { }
  
  case: Case = new Case();
  public geometry: any;
  public mapCenter: LngLatLike = [10.9, 48.3];
  public startLngLat: LngLatLike;
  public endLngLat: LngLatLike;
  public geoJsonData: any = {
    type: 'FeatureCollection',
    features: []
  };

  getNewCase() {
    this.http.get('/case').subscribe((data: any) => {
      this.case = data;
      this.geometry = JSON.parse(data.routingInformation?.routeAsPolyLine)['features'][0].geometry;
      this.mapCenter = [this.case.caseLocation.longitude, this.case.caseLocation.latitude];
      this.startLngLat = [this.case.caseLocation.longitude, this.case.caseLocation.latitude];
      this.endLngLat = [this.case.hospitalLocation.longitude, this.case.hospitalLocation.latitude];
      this.geoJsonData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: this.geometry
          }
        ]
      };
    });
  }
}
