import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatComponent } from 'src/app/main/component/chat/chat.component';
import { HttpServices } from 'src/app/service/http.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { UiService } from 'src/app/ui.service';
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
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  constructor(
    public dialog: MatDialog,
    private ui: UiService,
    public http: HttpServices,
    private router: Router,
    private formBuilder: FormBuilder,
    private userAccountService: UserAccountService,
  ) { }

  ngOnInit(){
    //  setTimeout(
    //   () => this.ui.show(),2000
    // )
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }else{
      this.roleAccount = false
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
    // setTimeout(
    //   () => this.ui.show(), 2000
    // )
    // setTimeout(
    //   () => this.ui.show(), 2500
    // )


    // setTimeout(
    //   () => this.ui.hide(), 3500
    // )

    // setTimeout(
    //   () => {this.ui.show();}, 4000
    // )

    // setTimeout(
    //   () => this.ui.reset(), 5000
    // )

  }

  onclickeditPassword(){
    console.log(this.oldpassword);
    console.log( this.newpassword);
    console.log( this.confirmpassword);
    setTimeout(
      () => this.ui.show()
    )

      this.userAccountService.checkpassword(this.oldpassword.value).then(result => {
      if(this.oldpassword.invalid || this.newpassword.invalid || this.confirmpassword.invalid ){
        throw new Error("");
      }else{
        if(this.newpassword.value.password == this.confirmpassword.value.password){
          this.newpassword.patchValue({
            password:this.newpassword.value.password
          })
          this.userAccountService.editpassword(this.newpassword.value)
          setTimeout(
            () => this.ui.hide()
          )
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
     this.http.postData('/services/webasset/api/createHistory',this.newProfile)
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

openDialoglike(): void {
  this.ui.show()
  this.router.navigate(['like', {}]);
}
}
