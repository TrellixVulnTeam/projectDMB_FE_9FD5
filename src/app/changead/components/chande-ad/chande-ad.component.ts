import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from 'src/app/service/userAccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chande-ad',
  templateUrl: './chande-ad.component.html',
  styleUrls: ['./chande-ad.component.css']
})
export class ChangeadComponent implements OnInit {
    data:any
    alertSuss : Boolean;
    confirmpass: FormGroup;
    changepass: FormGroup;
    submitted :boolean ;
    isLoading=false;
  constructor(
    private router: Router,
    public dialog : MatDialog,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(prams=>{
      this.data = JSON.parse(prams.data);
       console.log(this.data )
     })
     this.changepass = this.formBuilder.group({
      _id: new FormControl({ value: '', disabled: false }),
      password: new FormControl({ value: '', disabled: false },[Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    });
    this.confirmpass = this.formBuilder.group({
      confirmpass: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.minLength(6),Validators.maxLength(20)]),
    });
  }
  changepassword(){
    if(this.changepass.valid && this.confirmpass.valid){
      this.submitted =true
    if(this.changepass.value.password == this.confirmpass.value.confirmpass){
            this.submitted =true
            this.isLoading = true;
            this.changepass.patchValue({
              _id:this.data[0]._id,
              password:this.changepass.value.password
            })
        this.userAccountService.forgotpassword(this.changepass.value)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'บันทึกรหัสผ่านสำเร็จ'
        })
         this.router.navigate(['login', {}])
      }
      else{
        this.submitted =false
      }
    }
    else{
      this.submitted =false
    }
  }

  onclickaccount() {
    this.router.navigate(['account',{}])
  }

}
