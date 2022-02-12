import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { HttpServices } from 'src/app/service/http.service';
import { LikeUserService } from 'src/app/service/likeUser.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { ChatComponent } from '../chat/chat.component';
import { LikeComponent } from '../like/like.component';
import { SearchComponent } from '../search/search.component';
// import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  public roleAccount:boolean;
  public newProfile: any;
  public isLoaded:boolean=false;
  public ishttpLoaded:boolean=false;
  account2: FormGroup;
  dataProfile:any
  id_User:number
  likeUser: FormGroup;
  listlike:any;
  public listAction: Array<any> = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public http: HttpServices,
    public userAccountService :UserAccountService,
    private formBuilder: FormBuilder,
    public likeUserService :LikeUserService,

    ) { }


  ngOnInit(): void {
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.http.postData('/services/webasset/api/whereListlike',{user1:this.id_User}).then(result =>{
      debugger
      console.log(result);
      this.listlike = result
    });
    // this.likeUserService.getLikeUse({id_likeuser:this.id_User}).then(result =>{
    //   debugger
    //   console.log(result);
    // });
    // this.likeUserService.getLikeUse(this.likeUser.value).then(result => {
    //   console.log(result);
    // })
    this.likeUser  = this.formBuilder.group({
      user1: new FormControl({ value: '', disabled: false }),
      user2: new FormControl({ value: '', disabled: false }),
      id_chat: new FormControl({ value: null, disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
    });

    this.userAccountService.getUserAccount().then(result => {
      this.dataProfile = result.responseData.data
      for(let i=0 ;i<this.dataProfile.length;i++){
        if (this.dataProfile[i]._id == this.id_User){
          this.dataProfile.splice(i, 1);
        }
      }
      // for(let i=0 ;i< this.listlike.length;i++){
      //   debugger
      //   if (this.listlike[i].user2 == this.dataProfile[i]._id){
      //     debugger
      //     this.dataProfile.splice(i, 1);
      //   }
      // }
    });
  }

  openDialogchat(): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      height: '80%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialoglike(): void {
    const dialogRef = this.dialog.open(LikeComponent, {
      height: '80%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogsearch(): void {
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '75%',
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
      localStorage.removeItem('Authorization');
      this.router.navigate(['login', {}])
    }
  send() {
      const test ="https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b&text=สวัสดี&lang=th-en&format=html"
      this.http.get(test).then(result => {
       console.log(result);
      });;
  }
  like(item,id,index){
    // this.listAction.push(item)
      this.dataProfile.splice(index, 1);
      this.likeUser.patchValue({
        user1:this.id_User,
        user2:id,
        id_chat:this.likeUser.value.id_chat,
        status:this.likeUser.value.status,
      })
      this.likeUserService.createLikeUser(this.likeUser.value).then(result => {
        console.log(result);
      })
  }
  unlike(item,index){
    debugger
    // this.listAction.push(item)
      this.dataProfile.splice(index, 1);

  }
}
