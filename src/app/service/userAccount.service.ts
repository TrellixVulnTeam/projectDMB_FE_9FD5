import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { API } from '../url-constants';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(
    public http: HttpServices
  ) { }


  // tslint:disable-next-line:typedef
  getUserAccount() {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };

    return this.http.get(API.USERACCOUNT, requestOptions); //ตัวอย่างเรียกapiมาใช้
  }

  getLogin(username: string, password: string)   {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.postLogin(API.LOGIN, { username: username, password: password });
  }
  createAccount(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CREATEUSERACCOUNT, data);
  }
  createAccountAdmin(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CREATEUSERACCOUNTADMIN, data);
  }
  sentEmail(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.postData(API.SENTEMAIL, data);
  }
  editeAccount(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.put(API.EDITEACCOUNT.replace(':_id', data._id), data);
  }
  deleteAccount(data: any) {
    console.log(data)
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.delete(API.DELETEACCOUNT.replace(':_id', data._id));
  }

  whereUserforgotpass(data: any){
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.postLogin(API.WHEREUSERFORGOTPASS, data);
  }

  checkOtp(data: any){
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.postLogin(API.CHECKOTP, data);
  }

  forgotpassword(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    // return this.http.putLogin(API.FORGOTPASS, data);
    return this.http.putLogin(API.FORGOTPASS.replace(':_id', data._id), data);
  }



  checkpassword(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.postData(API.CHECKPASSWORD, data);
  }

   editpassword(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.put(API.EDITPASSWORD.replace(':_id', data._id), data);
  }

  checkCreateUser(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CHECKCREATEUSER, data);
  }

  createAccountImg(data: any) {
    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };
    return this.http.post(API.CREATEACCOUNTIMG, data);
  }

}
