import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { userAccountModel } from 'src/app/model/userAccount.model';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServices } from 'src/app/service/http.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account: FormGroup;
  htmlContent:any;
  email: FormGroup;
  checkuser: FormGroup;
  submitted :boolean;
  invalid:boolean;
  user : any;
  msgDupuser :any
  public dataAccount: any;
  accountTable: any;
  seasons: string[] = ['HR','ADMIN'];
  fileToUpload: File | null = null;
  imageFile: {};
  imagesProfile: any;
  msg:any;
  data:any;
  uploadFileImages: any = [];
  data_page1:any;
  public otherPrefix: boolean;
  checkNext:boolean = true;
  constructor(
    private formBuilder:FormBuilder,
    public userAccountService: UserAccountService,
    private router: Router,
    private httpService: HttpServices,
    private route:ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(prams=>{
      this.data_page1 = JSON.parse(prams.data);
      console.log( this.data_page1 )
    })
    this.checkuser = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.account = this.formBuilder.group({
      firstname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      username: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.email]),
      role: new FormControl({ value: 'USER', disabled: false }, [Validators.required]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required]),
      status: new FormControl({ value: '', disabled: false }),
      nickname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      prefix: new FormControl({ value: '', disabled: false }, [Validators.required]),
      // school: new FormControl({ value: '', disabled: false }, [Validators.required]),
      weight: new FormControl({ value: '', disabled: false }, [Validators.required]),
      age: new FormControl({ value: '', disabled: false }, [Validators.required]),
      height: new FormControl({ value: '', disabled: false }, [Validators.required]),
      gender: new FormControl({ value: '', disabled: false }, [Validators.required]),
      description: new FormControl({ value: '', disabled: false }),
      office: new FormControl({ value: '', disabled: false }, [Validators.required]),
      // province: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    if(this.data_page1 != null){
      this.account.patchValue({
        firstname:this.data_page1.firstname,
        lastname:this.data_page1.lastname,
        role:this.data_page1.role,
        username:this.data_page1.username,
        password:this.data_page1.password,
        status:this.data_page1.status,
        nickname:this.data_page1.nickname,
        prefix:this.data_page1.prefix,
        school:this.data_page1.school,
        weight:this.data_page1.weight,
        age:this.data_page1.age,
        height:this.data_page1.height,
        office:this.data_page1.office,
        gender:this.data_page1.gender,
        description:this.data_page1.description,
      })
    }
    // this.userAccountService.getUserAccount().then(result => {
    //  console.log(result);
    // });

    this.email = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required,]),
    });
    this.checkuser = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }
  onChange(value) {
    if (value === "อื่นๆ") {
      this.account.patchValue({ prefix: '' })
      this.otherPrefix = true;
    }
    else {
      this.otherPrefix = false;
    }
  }
  onclickCancel() {
    this.router.navigate(['login',{}])
  }
  async onclickNext(){
    if(this.account.invalid){
        Swal.fire({
          icon: 'error',
          text: 'Please fill out the information completely.!',
        })
    }else{
      this.router.navigate(['create-account-page2', {data :JSON.stringify( this.account.value) }])
    }
    }
  }

   /*-----------------------------*/
  /*Check Requisition No. Is null*/
  /*-----------------------------*/
//   checkReqNoIsNull(reqNo){
//     let url = `http://localhost:4200/#/account?name=${reqNo}`
//     const httpParams = new HttpParams();
//     const requestOptions = {
//       params: httpParams
//     };
//     this.http.get<any>(url,{})
//   }
