import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { ListAccountComponent } from '../list-account/list-account.component';
import Swal from 'sweetalert2';

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

  constructor(
    private formBuilder: FormBuilder,
    public userAccountService: UserAccountService,
    public dialogRef: MatDialogRef<EditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }
    seasons: string[] = ['HR','ADMIN'];

  ngOnInit(){
    this.dataAccount = this.data.dataKey;
    this.chackDup = this.data.dataTable
    console.log(this.data)
    console.log(this.chackDup)
    this.editaccout = this.formBuilder.group({
      firstname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: false }, [Validators.required]),
      username: new FormControl({ value: '', disabled: false }, [Validators.required,Validators.email]),
      role: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.checkuser = this.formBuilder.group({
      username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
    this.editaccout.patchValue({
      firstname:this.dataAccount.firstname,
      lastname:this.dataAccount.lastname,
      username:this.dataAccount.username,
      role:this.dataAccount.role
    })
    this.oldFirstname = this.dataAccount.firstname;
    this.oldEmail = this.dataAccount.username;
    this.oldLastname = this.dataAccount.lastname;
    this.oldRole= this.dataAccount.role;
  }

  submit(){
    if (this.editaccout.value.firstname == this.oldFirstname && this.editaccout.value.lastname == this.oldLastname &&
      this.editaccout.value.role == this.oldRole && this.oldEmail == this.dataAccount.username) {
        this.dialogRef.close();
    } else {
      this.checkDuplicate();
      if (this.duplicate == true||  this.editaccout.invalid){
        this.submitted = false
      } else {
          this.dataAccount.firstname = this.editaccout.value.firstname;
          this.dataAccount.lastname = this.editaccout.value.lastname;
          this.dataAccount.username = this.editaccout.value.username;
          this.dataAccount.role = this.editaccout.value.role;
          this.userAccountService.editeAccount(this.dataAccount)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
          })
          this.dialogRef.close();
      }
    }
    // this.checkDuplicate();
    // if (this.duplicate == true||  this.editaccout.invalid){
    //   this.submitted = false
    // } else {
    //     this.dataAccount.firstname = this.editaccout.value.firstname;
    //     this.dataAccount.lastname = this.editaccout.value.lastname;
    //     this.dataAccount.username = this.editaccout.value.username;
    //     this.dataAccount.role = this.editaccout.value.role;
    //     this.userAccountService.editeAccount(this.dataAccount)
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Your work has been saved',
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //     this.dialogRef.close();
    // }

  }
  onCancel(){
    this.dialogRef.close();
  }
  checkDuplicate() {


    for(let i = 0; i < this.chackDup.length; i++){

      if (this.editaccout.value.username != this.oldEmail) {
        if ((this.editaccout.value.username == this.chackDup[i].username) &&
          (this.editaccout.value.firstname == this.oldFirstname || this.editaccout.value.lastname == this.oldLastname||
            this.editaccout.value.role == this.oldRole)
        ) {
            console.log("Duplicate");
              this.duplicate = true;
              i =this.chackDup.length;
        }
      }

      else{
        this.duplicate = false;
      }
    }
  }
}
