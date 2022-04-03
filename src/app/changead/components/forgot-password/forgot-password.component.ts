import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { UiService } from 'src/app/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  whereUser: FormGroup;
  checkOtp: FormGroup;
  otp: FormGroup;
  user:any;
  btnLoading = false;
  submitted:boolean
  submitOtp:boolean=false
  constructor(
    private ui: UiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
  ) { }

  ngOnInit(){
    this.whereUser = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.checkOtp = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
      otp: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.otp = this.formBuilder.group({
      otp: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }
  onclickchange() {
      this.ui.show()
      this.userAccountService.whereUserforgotpass(this.whereUser.value).then(result => {
      this.user = result
        console.log(this.user);
        if(this.user.length==0){
          console.log('free')
          this.submitted =false
          this.submitOtp = false
        }
        else{
          this.submitted =true
          this.submitOtp = true
          const otp = Math.floor(1000 + Math.random() * 9000)
          this.checkOtp.patchValue({
            username:this.whereUser.value.username,
            otp:otp
          })
          console.log(this.checkOtp.value.otp)
          this.userAccountService.checkOtp(this.checkOtp.value)
          this.ui.hide()
        }
      })

      }

onclickOtp(){
  this.ui.show()
           if(this.checkOtp.value.otp == this.otp.value.otp){
            this.ui.hide()
            this.router.navigate(['changead', {data :JSON.stringify(this.user) }])
           }
           else {
            this.submitted =false
            this.submitOtp = false
            this.ui.hide()
           }
}
}

