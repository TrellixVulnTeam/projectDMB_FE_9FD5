import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { API } from '../url-constants';
import { HttpServices } from './http.service'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    public http: HttpServices
  ) { }
  getEmployee() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.get(API.EMPLOYEE, requestOptions);
  }
  getlistEmployee() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.get(API.EMPLOYEELIST, requestOptions);
  }

  getAddemployee(data:any){
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CREATEEMPLOY, data);
  }
  deleteEmployee(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.delete(API.DELETEEMPLOYEE.replace(':_id', data._id));
  }
  putEmployee(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.put(API.PUTEMPLOYEE.replace(':_id', data._id), data);

  }
  getSearchDatEmp(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.EMPLOYEESEARCHDATE, data);
  }

  reportEmployee(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.REPORTEMPLOYEE, data);
  }

}




