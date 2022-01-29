import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class HttpServices {
    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    get(url: string, params?: any): Promise<any> {
      // const token = localStorage.getItem('Authorization');
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: token,
          }),
          // params: params || {}
      };
      return this.http.get(url, httpOptions).toPromise().then(response => {
          return response;
        },error =>{
          if(error.error.resultCode =='40102'){
            this.checkSessionExpired()
          }
      }).catch((err) => {
          throw err;
      });
  }

  post(url, data): Promise<any> {
    // const token = localStorage.getItem('Authorization');
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: token
          })
      };
      return this.http.post(url,data,httpOptions).toPromise().then(response => {
        return response;


    }).catch((err) => {
        throw err;
    });
  }
  postLogin(url, data): Promise<any> {

    // const token = localStorage.getItem('Authorization');
    // console.log(localStorage)
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: token
          })
      };
      return this.http.post(url, data, httpOptions).toPromise().then(response => {
          return response;
      }).catch((err) => {
          throw err;
      });
  }

  putLogin(url, data): Promise<any> {
    // const token = localStorage.getItem('Authorization');
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: token
          })
      };
      return this.http.put(url, data, httpOptions).toPromise().then(response => {
          return response;

      }).catch((err) => {
          throw err;
      });
  }

  put(url, data): Promise<any> {
    const token = localStorage.getItem('Authorization');
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: token
          })
      };
      return this.http.put(url, data, httpOptions).toPromise().then(response => {
          return response;
      },error =>{
        if(error.error.resultCode =='40102'){
          this.checkSessionExpired()
        }
      }).catch((err) => {
          throw err;
      });
  }

  patch(url, data): Promise<any> {
    const token = localStorage.getItem('Authorization');
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: token
          })
      };
      return this.http.patch(url, data, httpOptions).toPromise().then(response => {
          return response;
        },error =>{
          if(error.error.resultCode =='40102'){
            this.checkSessionExpired()
          }
      }).catch((err) => {
          throw err;
      });
  }

  delete(url): Promise<any> {
    const token = localStorage.getItem('Authorization');
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: token
          })
      };

      return this.http.delete(url, httpOptions).toPromise().then(response => {
          return response;
        },error =>{
          if(error.error.resultCode =='40102'){
            this.checkSessionExpired()
          }
      }).catch((err) => {
          throw err;
      });
  }

  checkSessionExpired() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      text: 'เซสชั่นหมดอายุ กรุณา Login เข้าสู่ระบบใหม่'
    }).then((result) => {
      localStorage.removeItem('Authorization');
      this.router.navigate(['login', {}])
  })
  }

}
