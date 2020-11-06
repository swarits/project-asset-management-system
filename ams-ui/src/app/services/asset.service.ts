import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { group } from '@angular/animations';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  config = require('../../assets/json/config.json');

  constructor(private http: HttpClient) { }

  getAssets(clientId, group) {
    let params = new HttpParams().set('client_id', clientId).set('group', group);

    return this.http.get<any>(this.config.host + 'assets/', { params: params });
  }

  addAsset(data) {
    return this.http.post<any>(this.config.host + 'assets/', data, { observe: 'response' })
  }

  editAsset(data, assetId) {
    return this.http.put<any>(this.config.host + `assets/${assetId}`, data)
  }

  deleteAsset(data, assetId) {
    return this.http.delete<any>(this.config.host + `assets/${assetId}`)
  }

  getArchiveAssets(userId, group) {
    let params = new HttpParams().set('user_id', userId).set('group', group);
    return this.http.get<any>(this.config.host + 'assets/assign/', { params: params });
  }

  requestAsset(data) {
    return this.http.post<any>(this.config.host + 'assets/assign/', data, { observe: 'response' })
  }

  updateArchiveAsset(data, archiveId) {
    return this.http.put<any>(this.config.host + `assets/assign/${archiveId}/`, data, { observe: 'response' })
  }

}
