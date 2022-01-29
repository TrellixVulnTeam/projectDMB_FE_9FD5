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
      password: new FormControl({ value: '', disabled: false }, [Validators.required]),
      picture: new FormControl({ value: '', disabled: false }, [Validators.required])
    });
    this.userAccountService.getUserAccount().then(result => {
      console.log(result);
      debugger
      this.formLogin.patchValue({
        picture:result.responseData.data[0].picture
      })
    });
//     this.userAccountService.getUserAccount().then(result => {
// debugger
//       console.log(result);
//     })
  }

  onclickLogin() {
    debugger
    console.log(this.formLogin.value.picture);

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

  froalaOptions: Object = {
    charCounterCount: false,
    fileUpload: false,
    attribution: false,
    toolbarButtons: [
      ['fullscreen','superscript'],
      ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
      ['paragraphFormat', 'insertImage', 'embedly',
        'insertTable', 'insertLink'],
      ['specialCharacters', 'insertHR', 'clearFormatting'],
      ['print', 'spellChecker'],
      ['undo', 'redo',]],
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

}
