import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API } from '../url-constants';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  constructor(
    public http: HttpServices
  ) { }
  getEmployType() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.get(API.EMPLOYEETYPE, requestOptions);
  }

  getEmployTypes() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.get(API.EMPLOYEETYPE, requestOptions).then(resp => {
      return [
        {
          empId: '1',
          empName: 'empName1',
          value: 'empName1'
        }, {
          empId: '2',
          empName: 'empName2',
          value: 'empName2'
        }, {
          empId: '3',
          empName: 'empName3',
          value: 'empName3'
        }
      ]
    }).catch(err => {
      return [
        {
          empId: '1',
          empName: 'empName1',
          value: 'empName1'
        }, {
          empId: '2',
          empName: 'empName2',
          value: 'empName2'
        }, {
          empId: '3',
          empName: 'empName3',
          value: 'empName3'
        }
      ]
    })
  }

  postTypeEm(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CREATETYPEEMTYPE, data);
  }

  deleteTypeEm(data: any) {
    console.log(data)
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.delete(API.DELETETYPEEM.replace(':_id', data._id));

  }
  putTypeEm(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.put(API.PUTTYPEEM.replace(':_id', data._id), data);

  }

}
