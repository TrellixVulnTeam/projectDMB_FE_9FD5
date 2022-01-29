import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { API } from '../url-constants';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    public http: HttpServices
  ) { }
  getConfig() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.get(API.CONFIG, requestOptions);
  }
}


