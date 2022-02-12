import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserAccountService } from '../service/userAccount.service'
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import  jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email : any;
  public token: string;
  public password : any;
  msgErr: any;
  submit = false;
  formLogin: FormGroup;
  test:any
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService
  ) { }
  async ngOnInit(): Promise<any> {
    this.formLogin = this.formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-\s]+\\.[a-z]{2,4}$')
        ])),
      password: new FormControl({ value: '', disabled: false }, [Validators.required])
    });

    // this.userAccountService.getUserAccount().then(result => {
    //   this.formLogin.patchValue({
    //     picture:result.responseData.data[0].picture
    //   })
    // });
//     this.userAccountService.getUserAccount().then(result => {
// debugger
//       console.log(result);
//     })
  }

  onclickLogin() {
  this.formLogin.value.username
  try {
    this.submit = true;
      this.msgErr = '';
      if (!this.formLogin.value.username && !this.formLogin.value.password) {
        this.submit = false;
        throw 'Please enter your username and password';
      }
      if (!this.formLogin.value.username) {
        this.submit = false;
        throw 'Please enter your Username.';
      }
      if (!this.formLogin.value.password) {
        this.submit = false;
        throw 'Please enter your password.';
      }
      if (this.formLogin.invalid) {
        this.submit = false;
        throw 'Please enter valid email address';
      }
            this.userAccountService.getLogin(this.formLogin.value.username, this.formLogin.value.password)
            .then(result=>{
              const data = result.responseData.token;
              const roleAccount = jwt_decode(data);
              this.alertSucc()
            localStorage.setItem('Profile', JSON.stringify(roleAccount))
            localStorage.setItem('Authorization', result.responseData.token),this.router.navigate(['main',{}])
          },error =>{
            console.log(error)
            this.msgErr = 'username or password incorrect';
          }
        )
      } catch (error) {
        this.submit = false;
        this.msgErr = error;
      }
  }
  alertSucc(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'success',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
