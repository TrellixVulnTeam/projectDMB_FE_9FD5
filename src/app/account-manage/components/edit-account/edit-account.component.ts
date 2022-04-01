import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { ListAccountComponent } from '../list-account/list-account.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editaccout: FormGroup;
  submitted :boolean;
  checkuser: FormGroup;
  invalid:boolean;
  chackDup:any;
  user:any;
  dataAccount:any
  duplicate: boolean;
  oldEmail: any;
  oldFirstname: any;
  oldLastname: any;
  oldRole: any;
  dataView :any
  profile:FormGroup
  fileToUpload: File | null = null;
  imageFile: {};
  imagesProfile: any;
  msg:any;
  uploadFileImages: any = [];
  data_page1:any;
  public otherPrefix: boolean;
  checkNext:boolean = true;
  public roleAccount:boolean;
  public newProfile: any;
  id_viewUser:any
  dataUser:any
  admin:boolean
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public userAccountService: UserAccountService,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
    seasons: string[] = ['HR','ADMIN'];

  ngOnInit(){
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.dataUser = this.data.dataKey
    // console.log( this.dataView);
    this.profile  = this.formBuilder.group({
      _id: new FormControl({ value: '', disabled: true },[Validators.required]),
      type: new FormControl({ value: '', disabled: true },[Validators.required]),
      facebook: new FormControl({ value: '', disabled: true }),
      line: new FormControl({ value: '', disabled: true }),
      ig: new FormControl({ value: '', disabled: true }),
      phone: new FormControl({ value: null, disabled: true }),
      picture: new FormControl({ value: '', disabled: true }),
      province: new FormControl({ value: '', disabled: true }, [Validators.required]),
      firstname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      username: new FormControl({ value: '', disabled: true }, [Validators.required,Validators.email]),
      role: new FormControl({ value: 'USER', disabled: true }, [Validators.required]),
      password: new FormControl({ value: '', disabled: true }, [Validators.required]),
      status: new FormControl({ value: '', disabled: true }, [Validators.required]),
      nickname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      prefix: new FormControl({ value: '', disabled: true }, [Validators.required]),
      school: new FormControl({ value: '', disabled: true }, [Validators.required]),
      weight: new FormControl({ value: '', disabled: true }, [Validators.required]),
      age: new FormControl({ value: '', disabled: true }, [Validators.required]),
      height: new FormControl({ value: '', disabled: true }, [Validators.required]),
      gender: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl({ value: '', disabled: true }, [Validators.required]),
      office: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
    this.profile.patchValue({
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
    debugger
    if(this.dataUser.role == 'ADMIN'){
      this.admin = true
    }else{
      this.admin = false
    }
    if(this.dataUser.phone == null || this.dataUser.phone == ''){
      debugger
      this.profile.patchValue({
        phone: '-',
      })
    }
    this.imagesProfile = this.dataUser.picture
    console.log(this.profile.value.phone);
  }

  submit(){
    const obj = {
      _id:this.dataView._id ,
      status: false
    }
    this.userAccountService.editeAccount(obj)
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
        this.profile.patchValue({
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

