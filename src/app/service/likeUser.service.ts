import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { API } from '../url-constants';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LikeUserService {
  constructor(
    public http: HttpServices
  ) { }

  getLikeUse(data:any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    debugger
    return this.http.getData(API.LISTLIKEUSER, data);
  }
  createLikeUser(data:any){
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.postData(API.CREATELIKEUSER, data);
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

  putStatusLike(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.put(API.PUTSTATUSLIKE.replace(':id_likeuser', data.id_likeuser), data);
  }
}


