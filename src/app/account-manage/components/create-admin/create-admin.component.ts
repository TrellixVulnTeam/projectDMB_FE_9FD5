import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServices } from 'src/app/service/http.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { UiService } from 'src/app/ui.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
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
    private ui: UiService,
    private formBuilder:FormBuilder,
    public userAccountService: UserAccountService,
    private router: Router,
    private httpService: HttpServices,
    private route:ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    // setTimeout(
    //   () => this.ui.show()
    // )
    // this.route.params.subscribe(prams=>{
    //   this.data_page1 = JSON.parse(prams.data);
    //   console.log( this.data_page1 )
    // })
    this.checkuser = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.account = this.formBuilder.group({
      type: new FormControl({ value: '', disabled: false },[Validators.required]),
      facebook: new FormControl({ value: '', disabled: false }),
      line: new FormControl({ value: '', disabled: false }),
      ig: new FormControl({ value: '', disabled: false }),
      phone: new FormControl({ value: null, disabled: false }),
      picture: new FormControl({ value: '', disabled: false },[Validators.required]),
      province: new FormControl({ value: '', disabled: false }, [Validators.required]),
      firstname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      username: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.email]),
      role: new FormControl({ value: 'ADMIN', disabled: false }, [Validators.required]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required]),
      status: new FormControl({ value: '', disabled: false }, [Validators.required]),
      nickname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      prefix: new FormControl({ value: '', disabled: false }, [Validators.required]),
      school: new FormControl({ value: '', disabled: false }, [Validators.required]),
      weight: new FormControl({ value: null, disabled: false }, [Validators.required]),
      age: new FormControl({ value: null, disabled: false }, [Validators.required]),
      height: new FormControl({ value: null, disabled: false }, [Validators.required]),
      gender: new FormControl({ value: '', disabled: false }, [Validators.required]),
      description: new FormControl({ value: '', disabled: false }, [Validators.required]),
      office: new FormControl({ value: '', disabled: false }, [Validators.required]),
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
    if (value === "อื่นๆ"){
      this.account.patchValue({ prefix: '' })
      this.otherPrefix = true;
    }
    else {
      this.otherPrefix = false;
    }
  }
  onclickCancel() {
    this.router.navigate(['list-account',{}])
  }
  onSubmit(){
    this.ui.show()
    this.checkuser.patchValue({
      username: this.account.value.username
    })
    this.userAccountService.checkCreateUser(this.checkuser.value).then(result => {
      this.user = result
        if(this.user.length==0 ){
          if(this.account.value.picture != ""){
            this.submitted =true
          this.email.patchValue({
            username: this.account.value.username
          })
          this.userAccountService.createAccountAdmin(this.account.value).then(result => {
            this.userAccountService.sentEmail(this.email.value)
            this.ui.hide()
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
               title: 'Save data successfully '
             })
             this.router.navigate(['list-account',{}])
           })
          }
          else{
            this.ui.hide()
            Swal.fire({
              icon: 'error',
              text: 'Please fill out the information completely.!',
            })
          }
          }
        else{
          this.ui.hide()
          this.invalid =true
          this.submitted =false
          }
        })
  }

  async changeListenerFileImages($event) {
    try {
      this.uploadFileImages = []
      const res = await this.myUploadFile($event.target);
      const file = ($event.target.files[0] as File);
      this.imageFile =  res[0] ? res[0] : this.imageFile,
      this.imagesProfile = res[0]
      debugger
      this.uploadFileImages.push(this.imageFile)
      this.account.patchValue({
        picture:this.imageFile,
      })

    } catch (error) {
      console.log(error);
    }
  }
  async myUploadFile(inputValue: any): Promise<any> {
    try {
      const promise = [];
      // tslint:disable-next-line:prefer-for-of
      const file: File = inputValue.files[0];
      if (file.size > 30720000) { // 30 MB
        this.msg = 'ไฟล์เกินขนาด 5 MB';
        throw this.msg;
      }
      promise.push(readBase64(file));
      const myReader: FileReader = new FileReader();
      return await Promise.all(promise);
    } catch (error) {
      throw error;
    }
  }

  //--------------------------------------------------//
  downloadImages(param: any): Promise<string> {
    return this.download(param).then((response) => {
        let fileName = 'file';
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDisposition);
            if (matches != null && matches[1]) { fileName = matches[1].replace(/['"]/g, ''); }
        }
        const fileContent: Blob = response.body;
        return this.readBase64(fileContent).then((res) => {
            return res;
        });
    }).catch((err) => {
        return null;
    });
}
download(params: any): Promise<HttpResponse<any>> {
  return this.http.get<HttpResponse<any>>(`api/file/download-file/${params}`, {
      headers: this.setHeader(),
      responseType: 'blob' as 'json',
      observe: 'response' as 'body'
  }).toPromise();
}
setHeader(): HttpHeaders {
  const headers = new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      'Authorization': localStorage.getItem('Authorization'),
  });
  return headers;
}

readBase64(file: Blob): Promise<any> {
  const reader = new FileReader();
  const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => { resolve(reader.result); }, false);
      reader.addEventListener('error', (event) => { reject(event); }, false);
      reader.readAsDataURL(file);
  });
  return future;
}
  }
  function readBase64(file): Promise<any> {
  const reader = new FileReader();
  const future = new Promise((resolve, reject) => {
    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result);
      },
      false
    );

    reader.addEventListener(
      'error',
      (event) => {
        reject(event);
      },
      false
    );

    reader.readAsDataURL(file);
  });
  return future;
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

