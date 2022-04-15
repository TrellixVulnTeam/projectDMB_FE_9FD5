import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServices } from 'src/app/service/http.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { UiService } from 'src/app/ui.service';
import Swal from 'sweetalert2';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
  picMe:any
  uploadFileImages: any = [];
  data_page1:any;
  public otherPrefix: boolean;
  checkNext:boolean = true;
  account2: FormGroup;
  public roleAccount:boolean;
  public newProfile: any;
  id_viewUser:any
  dataUser:any
  constructor(
    private ui: UiService,
    public dialog: MatDialog,
    public http: HttpServices,
    private formBuilder:FormBuilder,
    public userAccountService: UserAccountService,
    private router: Router,
    private httpService: HttpServices,
    private route:ActivatedRoute,
  ) {
  }
  states: string[] = [
    'Chiang Rai',
    'Chiang Mai',
    'nan',
    'Phayao',
    'Phrae ',
    'Mae Hong Son',
    'Lampang',
    'Lamphun',
    'Uttaradit',
    'Kalasin',
    'Khon Kaen',
    'Chaiyaphum',
    'Nakhon Phanom',
    'Nakhon Ratchasima',
    'Bueng Kan',
    'Buriram',
    'Maha Sarakham',
    'Mukdahan',
    'Yasothon ',
    'Roi Et',
    'Loei',
    'Sakon Nakhon',
    'Surin ',
    'Sisaket ',
    'Nong Khai',
    'Nong Bua Lamphu',
    'Udon Thani',
    'Ubon Ratchathani',
    'Amnat Charoen',
    'Bangkok',
    'Kamphaeng Phet ',
    'Nakhon Nayok',
    'Nakhon Sawan',
    'Nonthaburi',
    'Pathum Thani',
    'Phra Nakhon Si Ayutthaya',
    'Phichit',
    'Phitsanulok',
    'Phetchabun',
    'Lopburi',
    'Samut Prakan',
    'Samut Songkhram',
    'Samut Sakhon',
    'Singburi',
    'Sukhothai',
    'Suphanburi ',
    'Saraburi',
    'Angthong',
    'Uthai Thani',
    'Chanthaburi ',
    'Chachoengsao',
    'Chonburi',
    'Trat',
    'Prachinburi',
    'Rayong ',
    'Sa Kaeo',
    'Kanchanaburi',
    'Tak ',
    'Prachuap Khiri Khan ',
    'Phetchaburi',
    'Ratchaburi ',
    'Krabi',
    'Chumphon',
    'Trang ',
    'Nakhon Si Thammarat',
    'Narathiwat',
    'Pattani',
    'Phang Nga',
    'Phatthalung',
  ];


  ngOnInit() {
    this.ui.show()
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }else{
      this.roleAccount = false
    }

    this.id_viewUser = this.newProfile._id

    this.checkuser = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.account = this.formBuilder.group({
      _id: new FormControl({ value: '', disabled: false },[Validators.required]),
      type: new FormControl({ value: '', disabled: false },[Validators.required]),
      facebook: new FormControl({ value: '', disabled: false }),
      line: new FormControl({ value: '', disabled: false }),
      ig: new FormControl({ value: '', disabled: false }),
      phone: new FormControl({ value: null, disabled: false }),
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

    this.http.postData('/services/webasset/api/viewAccouct',{_id: this.id_viewUser}).then(result =>{
      this.dataUser = result[0]
      this.picMe =result[0].picture
      console.log(this.dataUser);
      this.account.patchValue({
        _id:this.dataUser._id,
        firstname:this.dataUser.firstname,
        lastname:this.dataUser.lastname,
        role:this.dataUser.role,
        username:this.dataUser.username,
        password:this.dataUser.password,
        status:this.dataUser.status,
        nickname:this.dataUser.nickname,
        prefix:this.dataUser.prefix,
        school:this.dataUser.school,
        weight:this.dataUser.weight,
        age:this.dataUser.age,
        height:this.dataUser.height,
        office:this.dataUser.office,
        gender:this.dataUser.gender,
        description:this.dataUser.description,
        facebook:this.dataUser.facebook,
        line:this.dataUser.line,
        ig:this.dataUser.ig,
        province:this.dataUser.province,
        type:this.dataUser.type,
        phone:this.dataUser.phone,
        picture:this.dataUser.picture
      })
      if(this.imagesProfile!=null || this.imagesProfile != ''){
         this.imagesProfile = this.account.value.picture
      }
      this.ui.hide()
    });
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
    this.router.navigate(['main',{}])
  }
  async onclickNext(){
    this.ui.show()
    this.userAccountService.editeAccount(this.account.value).then(result =>{
      console.log(result);
      Swal.fire(
        'Save data successfully!',
        '',
        'success'
      )
      this.ui.hide()
    })

    // if(this.account.invalid){
    //     Swal.fire({
    //       icon: 'error',
    //       text: 'Please fill out the information completely.!',
    //     })
    // }else{
    //   this.router.navigate(['create-account-page2', {data :JSON.stringify( this.account.value) }])
    // }
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
    logout() {
      localStorage.removeItem('Authorization');
      this.router.navigate(['login', {}]);
  }
  openDialogchat(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      height: '90%',
      width: '90%',
      panelClass: 'custom-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialoglike(): void {
    this.ui.show()
    this.router.navigate(['like', {}]);
  }

  Deleteaccount(){
    Swal.fire({
      title: 'Delete Account',
      text: "Are you sure you want to delete this Account?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ca9dbb',
      cancelButtonColor: '#696969',
    }).then((result) => {
      if (result.isConfirmed) {
       this.http.postData('/services/webasset/api/createHistory',this.dataUser)
        this.userAccountService.deleteAccount(this.newProfile).then(() => {
         Swal.fire(
           'Deleted!',
           'Your file has been deleted.',
           'success'
         )
         this.router.navigate(['login', {}]);
        });

      }
    })

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
