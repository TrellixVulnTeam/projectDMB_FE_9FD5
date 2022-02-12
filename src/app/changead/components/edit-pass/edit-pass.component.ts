import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/service/userAccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.component.html',
  styleUrls: ['./edit-pass.component.css']
})
export class EditPassComponent implements OnInit {
  oldpassword: FormGroup;
  newpassword: FormGroup;
  confirmpassword: FormGroup;
  public newProfile: any;
  public roleAccount:boolean;
  checkp:boolean
  msgErr: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
  ) { }

  ngOnInit(){
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.oldpassword = this.formBuilder.group({
      password: new FormControl({ value: '', disabled: false },[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    });
    this.newpassword = this.formBuilder.group({
      password: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.minLength(6),Validators.maxLength(20)],
      ),
    });
    this.confirmpassword = this.formBuilder.group({
      password: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    });

  }

  onclickeditPassword(){
      this.userAccountService.checkpassword(this.oldpassword.value).then(result => {
      if(this.oldpassword.invalid || this.newpassword.invalid || this.confirmpassword.invalid ){
        throw new Error("");
      }else{
        if(this.newpassword.value.password == this.confirmpassword.value.password){
          this.newpassword.patchValue({
            password:this.newpassword.value.password
          })
          this.userAccountService.editpassword(this.newpassword.value)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2300,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            text: 'Password saved successfully, please Login Login again.'
          }).then((result) => {
            localStorage.removeItem('Authorization');
            this.router.navigate(['login', {}])
        })
        }else{
          throw new Error("");
        }
      }
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          text: 'Incorrect password Please enter again!',
        })
      });
}

  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login', {}])
  }
  onclickAsset() {
    this.router.navigate(['data-asset', {}])
  }
  onclickEmployee() {
    this.router.navigate(['employee', {}])
  }
  onclickLogout() {
    this.router.navigate(['login', {}])
  }
  onclickdataadmin() {
    this.router.navigate(['admin', {}])
  }
  onclickchangead() {
    this.router.navigate(['changead', {}])
  }
  onclickManagement() {
    this.router.navigate(['management', {}])
  }
  onclickSite() {
    this.router.navigate(['site', {}])
  }
  onclickBrand() {
    this.router.navigate(['brand', {}])
  }
  onclickModel() {
    this.router.navigate(['model', {}])
  }
  onclickType() {
    this.router.navigate(['type', {}])
  }
  clickSearch() {
    this.router.navigate(['changead', {}])
  }
  onclickaccount() {
    this.router.navigate(['list-account', {}])
  }
  onclickEmtype() {
    this.router.navigate(['emtype', {}])
  }
  onclickStatus() {
    this.router.navigate(['status', {}])
  }
  onclickeditpassword() {
    this.router.navigate(['editpassword', {}])
  }
  onCancel() {
    this.router.navigate(['list-account', {}])
  }
}
