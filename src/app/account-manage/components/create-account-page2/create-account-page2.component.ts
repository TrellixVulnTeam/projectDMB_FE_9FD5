import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServices } from 'src/app/service/http.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';
interface state {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-account-page2',
  templateUrl: './create-account-page2.component.html',
  styleUrls: ['./create-account-page2.component.css']
})
export class CreateAccountPage2Component implements OnInit {
  
  account2: FormGroup;
  img: FormGroup;
  msg: any;
  filesImages: any;
  loading: boolean = true;
  uploadFileMultiple: any = []
  files: any;
  cols: any = []
  imageFile: {};
  imagesProfile: any;
  imagesProfile2: any;
  uploadFileImages: any = [];
  data_page1:any;
  test:any;
  checkuser: FormGroup;
  user:any;
  submitted :boolean;
  invalid:boolean;
  value = 0;
  // loading = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpService: HttpServices,
    public userAccountService: UserAccountService,
    private route:ActivatedRoute,
  ) { }

  states: state[] = [
    {value: '1', viewValue: 'Nakhon Ratchasima'},
    {value: '2', viewValue: 'Chiang Mai'},
    {value: '3', viewValue: 'Kanchanaburi'},
    {value: '4', viewValue: 'Tak'},
    {value: '5', viewValue: 'Ubon Ratchathani'},
    {value: '6', viewValue: 'Surat Thani'},
    {value: '7', viewValue: 'Chaiyaphum'},
    {value: '8', viewValue: 'Mae Hong Son'},
    {value: '9', viewValue: 'Phetchabun'},
    {value: '10', viewValue: 'Lampang'},
    {value: '11', viewValue: 'Udon Thani'},
    {value: '12', viewValue: 'Chiang Rai'},
    {value: '13', viewValue: 'Nan'},
    {value: '14', viewValue: 'Loei'},
    {value: '15', viewValue: 'Khon Kaen'},
    {value: '16', viewValue: 'Phitsanulok'},
    {value: '17', viewValue: 'Buri Ram'},
    {value: '18', viewValue: 'Nakhon Si Thammarat	'},
    {value: '19', viewValue: 'Sakon Nakhon'},
    {value: '20', viewValue: 'Nakhon Sawan'},
    {value: '21', viewValue: 'Sisaket'},
    {value: '22', viewValue: 'Kamphaeng Phet'},
    {value: '23', viewValue: 'Roi Et'},
    {value: '24', viewValue: 'Surin'},
    {value: '25', viewValue: 'Uttaradit'},
    {value: '26', viewValue: 'Songkhla'},
    {value: '27', viewValue: 'Sa Kaeo'},
    {value: '28', viewValue: 'Kalasin'},
    {value: '29', viewValue: 'Uthai Thani'},
    {value: '30', viewValue: 'Phrae'},
    {value: '31', viewValue: 'Prachuap Khiri Khan'},
    {value: '32', viewValue: 'Chanthaburi'},
    {value: '33', viewValue: 'Phayao'},
    {value: '34', viewValue: 'Phetchaburi'},
    {value: '35', viewValue: 'Lop Buri'},
    {value: '36', viewValue: 'Chumphon'},
    {value: '37', viewValue: 'Nakhon Phanom'},
    {value: '38', viewValue: 'Suphan Buri'},
    {value: '39', viewValue: 'Chachoengsao'},
    {value: '40', viewValue: 'Maha Sarakham'},
    {value: '41', viewValue: 'Ratchaburi'},
    {value: '42', viewValue: 'Trang'},
    {value: '43', viewValue: 'Prachinburi'},
    {value: '44', viewValue: 'Krabi'},
    {value: '45', viewValue: 'Phichit'},
    {value: '46', viewValue: 'Yala'},
    {value: '47', viewValue: 'Lamphun'},
    {value: '48', viewValue: 'Chon Buri'},
    {value: '49', viewValue: 'Narathiwat'},
    {value: '50', viewValue: 'Mukdahan'},
    {value: '51', viewValue: 'Bueng Kan'},
    {value: '52', viewValue: 'Phang Nga'},
    {value: '53', viewValue: 'Yasothon'},
    {value: '54', viewValue: 'Nong Bua Lamphu'},
    {value: '55', viewValue: 'Saraburi'},
    {value: '56', viewValue: 'Rayong'},
    {value: '57', viewValue: 'Phatthalung'},
    {value: '58', viewValue: 'Ranong'},
    {value: '59', viewValue: 'Amnat Charoen'},
    {value: '60', viewValue: 'Nong Khai'},
    {value: '61', viewValue: 'Trat'},
    {value: '62', viewValue: 'Ayutthaya'},
    {value: '63', viewValue: 'Satun'},
    {value: '64', viewValue: 'Chainat'},
    {value: '65', viewValue: 'Nakhon Pathom'},
    {value: '66', viewValue: 'Nakhon Nayok'},
    {value: '67', viewValue: 'Pattani'},
    {value: '68', viewValue: 'Bangkok'},
    {value: '69', viewValue: 'Pathum Thani'},
    {value: '70', viewValue: 'Samut Prakan'},
    {value: '71', viewValue: 'Ang Thong'},
    {value: '72', viewValue: 'Samut Sakhon'},
    {value: '73', viewValue: 'Sing Buri'},
    {value: '74', viewValue: 'Nonthaburi'},
    {value: '75', viewValue: 'Phuket'},
    {value: '76', viewValue: 'Samut Songkhram'},
    {value: '77', viewValue: 'Sukhothai'},
  ];

  ngOnInit(): void {

    this.route.params.subscribe(prams=>{
      this.data_page1 = JSON.parse(prams.data);
      console.log( this.data_page1 )
      })
      this.checkuser = this.formBuilder.group({
        username: new FormControl({ value: '', disabled: false }, [Validators.required]),
      });
    this.account2 = this.formBuilder.group({
      type: new FormControl({ value: '', disabled: false }),
      facebook: new FormControl({ value: '', disabled: false }),
      line: new FormControl({ value: '', disabled: false }),
      ig: new FormControl({ value: '', disabled: false }),
      phone: new FormControl({ value: '', disabled: false }),
      picture: new FormControl({ value: '', disabled: false }),
      province: new FormControl({ value: '', disabled: false }, [Validators.required]),
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
    });
    console.log(this.account2.value);
    this.account2.patchValue({
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


    // this.userAccountService.createAccount(this.account.value).then(result => {
    //   debugger
    //     this.alertSucc()
    //     this.router.navigate(['create-account-page2',{id: result.responseData.data._id}]);

    //     })
    // this.img = this.formBuilder.group({
    //   file_id: new FormControl({ value: '', disabled: false }, [Validators.required]),
    //   userAccount_id: new FormControl({ value: '', disabled: false }, [Validators.required]),
    //   file_name: new FormControl({ value: '', disabled: false }, [Validators.required]),
    //   file_path: new FormControl({ value: '', disabled: false }, [Validators.required]),
    //   file_type: new FormControl({ value: '', disabled: false }, [Validators.required]),
    //   file_size: new FormControl({ value: '', disabled: false }, [Validators.required]),
    // });

    //  let param = "2bda0467252685d62032ce444fffb9b5.jpg"
    // this.imagesProfile2 = this.downloadImages(param);
    // console.log( this.imagesProfile2);
    // debugger

    // this.userAccountService.getUserAccount().then(result => {
    //   this.formLogin.patchValue({
    //     picture:result.responseData.data[0].picture
    //   })
    // });
  }

  onSubmit(){
    debugger
    this.checkuser.patchValue({
      username: this.account2.value.username
    })
    this.userAccountService.checkCreateUser(this.checkuser.value).then(result => {
      debugger
      this.user = result
        console.log(this.user);
        if(this.user.length==0 ){
          this.submitted =true
          this.userAccountService.createAccount(this.account2.value).then(result => {
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
               title: 'บันทึกข้อมูลสำเร็จ'
             })
             this.router.navigate(['login', {}])
           })

          }
        else{
          this.invalid =true
          this.submitted =false
          }
        })





  }

  onCancel(){
    this.router.navigate(['create-account', {data :JSON.stringify(this.data_page1) }])
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
      this.account2.patchValue({
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
readBase64(file: Blob): Promise<any> {
  const reader = new FileReader();
  const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', () => { resolve(reader.result); }, false);
      reader.addEventListener('error', (event) => { reject(event); }, false);
      reader.readAsDataURL(file);
  });
  return future;
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
