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
    this.account = this.formBuilder.group({
      firstname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      username: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.email]),
      role: new FormControl({ value: 'USER', disabled: false }, [Validators.required]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required]),
      status: new FormControl({ value: '', disabled: false }, [Validators.required]),
      nickname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      prefix: new FormControl({ value: '', disabled: false }, [Validators.required]),
      school: new FormControl({ value: '', disabled: false }, [Validators.required]),
      weight: new FormControl({ value: '', disabled: false }, [Validators.required]),
      age: new FormControl({ value: '', disabled: false }, [Validators.required]),
      height: new FormControl({ value: '', disabled: false }, [Validators.required]),
      gender: new FormControl({ value: '', disabled: false }, [Validators.required]),
      description: new FormControl({ value: '', disabled: false }, [Validators.required]),
      office: new FormControl({ value: '', disabled: false }, [Validators.required]),
      // province: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    console.log(this.data_page1);

    if(this.data_page1 != null){
      debugger
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
  onclickCancel() {
    this.router.navigate(['login',{}])
  }
  async onclickCraeate(){
    debugger
    this.router.navigate(['create-account-page2', {data :JSON.stringify( this.account.value) }])
    // this.router.navigate(['create-account-page2',{data: this.account}]);
    // debugger
    // await this.httpService.post('/api/createAccount',this.account.value).then(result => {
    //   console.log(result);
    //   debugger
    // })

// this.userAccountService.createAccount(this.account.value).then(result => {
//   debugger
//     this.alertSucc()
//     this.router.navigate(['create-account-page2',{id: result.responseData.data._id}]);

//     })


    //  this.checkuser.patchValue({
    //       username: this.account.value.username
    // })


    // this.userAccountService.checkCreateUser(this.checkuser.value).then(result => {
    //   this.user = result
    //   debugger
    //     console.log(this.user);
    //     if(this.user.length==0 || this.account.invalid){
    //       this.submitted =true
    //       if(this.account.invalid){
    //         this.invalid =false
    //         this.submitted =true
    //       }
    //       else{
    //         this.invalid =true
    //         debugger
    //         this.userAccountService.createAccount(this.account.value).then(result => {
    //           console.log(result);

    //         })
    //       debugger
    //         this.email.patchValue({
    //           username: this.account.value.username
    //         })
    //         this.userAccountService.sentEmail(this.email.value)
    //         Swal.fire({
    //           position: 'center',
    //           icon: 'success',
    //           title: 'Your work has been saved',
    //           showConfirmButton: false,
    //           timer: 1000
    //         })
    //         this.router.navigate(['list-account',{}])
    //       }
    //       }
    //     else{
    //       this.invalid =true
    //       this.submitted =false
    //       }
    //     } )
      }

    froalaOptions: Object = {
      charCounterCount: false,
      fileUpload: false,
      attribution: false,
      toolbarButtons: [
        ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
        ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
        ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertImage', 'embedly',
          'insertTable', 'insertLink'],
        ['specialCharacters', 'insertHR', 'clearFormatting'],
        ['print', 'spellChecker'],
        ['undo', 'redo']],
      toolbarSticky: false,
      language: 'de',
      fontFamily: {
        'Arial,Helvetica,sans-serif': 'Arial',
        '\'Courier New\',Courier,monospace': 'Courier New',
        'Georgia,serif': 'Georgia',
        'Impact,Charcoal,sans-serif': 'Impact',
        '\'Lucida Console\',Monaco,monospace': 'Lucida Console',
        'Tahoma,Geneva,sans-serif': 'Tahoma',
        '\'Times New Roman\',Times,serif': 'Times New Roman',
        'Verdana,Geneva,sans-serif': 'Verdana',
      },
      events: {
        'froalaEditor.image.beforeUpload': function (e, editor, files) {
          if (files.length) {
            // Create a File Reader.
            const reader = new FileReader();

            // Set the reader to insert images when they are loaded.
            reader.onload = function (eLoad) {
              const result = (<any>(eLoad.target)).result;
              editor.image.insert(result, null, null, editor.image.get());
            };

            // Read image as base64.
            reader.readAsDataURL(files[0]);
          }

          editor.popups.hideAll();

          // Stop default upload chain.
          return false;
        },
        'contentChanged': () => {
          // Nothing
          //console.log('contentChanged', this.model.details);
        }
      },
    };
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
