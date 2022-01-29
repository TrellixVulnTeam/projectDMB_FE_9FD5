import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { API } from '../url-constants';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAssetService {
  constructor(
    public http: HttpServices
  ) { }
  getEmployeeAsset() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.get(API.EMPLOYEEASSET, requestOptions);
  }
  postEmpAsset(data:any){
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CREATEEMPASSET, data);
  };
  listEmpUseAsset(data:any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.LISTEMPUSEASSET, data);
  }
  deleteEmpAsset(data: any){
    console.log(data)
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.delete(API.DELETEEMPASSET.replace(':_id', data._id));
  }

  empDetail(data:any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.EMPDETAIL, data);
  }
  assetDetail(data:any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.ASSETDETAIL, data);
  }
  listDeleteAsset(data:any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.LISTDELETEASSET, data);
  }
  putEmpasset(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.put(API.PUTEMPASSET.replace(':_id', data._id), data);
  }

  changeStatusAsset(data:any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CHANGESTATUSASSET, data);
  }
}


