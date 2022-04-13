import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { HttpServices } from 'src/app/service/http.service';
import { LikeUserService } from 'src/app/service/likeUser.service';
import { UserAccountService } from 'src/app/service/userAccount.service';
import { UiService } from 'src/app/ui.service';
import Swal from 'sweetalert2';
import { ChatComponent } from '../chat/chat.component';
import { LikeComponent } from '../like/like.component';
import { SearchComponent } from '../search/search.component';
import { ViewComponent } from '../view/view.component';
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
  id_viewUser:any
  public listAction: Array<any> = [];
  page = 0;
  size = 4;
  listpic: any;
  historyUser:any
  picMe:any

  constructor(
    private ui: UiService,
    private router: Router,
    public dialog: MatDialog,
    public http: HttpServices,
    public userAccountService :UserAccountService,
    private formBuilder: FormBuilder,
    public likeUserService :LikeUserService,

    ) { }


  ngOnInit(): void {
    this.ui.show()
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    console.log( this.newProfile);
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }else{
      this.roleAccount = false
    }

    this.http.postData('/services/webasset/api/viewAccouct',{_id: this.id_User}).then(result =>{
      this.historyUser =result[0]
      this.picMe =result[0].picture
    })
    this.likeUser  = this.formBuilder.group({
      user1: new FormControl({ value: '', disabled: false }),
      user2: new FormControl({ value: '', disabled: false }),
      id_chat: new FormControl({ value: null, disabled: false }),
      status: new FormControl({ value: false, disabled: false }),
      chat_status :new FormControl({ value: false, disabled: false })
    });

    this.userAccountService.getUserAccount().then(result => {
      debugger
      this.ui.show()
      this.dataProfile = result.responseData.data
      for(let i=0 ;i<this.dataProfile.length;i++){
        if (this.dataProfile[i]._id == this.id_User){
          this.dataProfile.splice(i, 1);
        }
        if (this.dataProfile[i].role == 'ADMIN'){
          this.dataProfile.splice(i, 1);

        }
        this.ui.hide()
      }
      // this.ui.hide()
    });


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
    // const dialogRef = this.dialog.open(LikeComponent, {
    //   height: '80%',
    //   width: '90%',
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  openDialogsearch(): void {
    const dialogRef = this.dialog.open(SearchComponent, {
      height: '75%',
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if( result == undefined ){
        this.dataProfile
        for(let i=0 ;i<this.dataProfile.length;i++){
          if (this.dataProfile[i]._id == this.id_User){
            this.dataProfile.splice(i, 1);
          }
        }
      }else{
        this.dataProfile=result
      }

      // if(result.length == 0){
      //   this.dataProfile.splice(0,this.dataProfile.length)
      //   this.dataProfile
      //   debugger

      //   this.dataProfile = result
      // }


    });
  }

  openDialogView(item): void {
    const dialogRef = this.dialog.open(ViewComponent, {
      height: '75%',
      width: '60%',
      data: {
        dataKey: item
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login', {}]);
}
  send() {
      const test ="https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20220206T162939Z.f89eee1b2c620d9e.922bb9755a6f37ffd99db91fb41ebf412e0ab28b&text=สวัสดี&lang=th-en&format=html"
      this.http.get(test).then(result => {
       console.log(result);
      });;
  }
  like(item,id,index){

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

    // this.listAction.push(item)
      this.dataProfile.splice(index, 1);

  }
  resetfilter(){
    this.ui.show()
    this.userAccountService.getUserAccount().then(result => {
      this.dataProfile = result.responseData.data
      for(let i=0 ;i<this.dataProfile.length;i++){
        if (this.dataProfile[i]._id == this.id_User){
          this.dataProfile.splice(i, 1);
        }
        if (this.dataProfile[i].role == 'ADMIN'){
          this.dataProfile.splice(i, 1);

        }
      }
      this.ui.hide()
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
        this.http.postData('/services/webasset/api/createHistory', this.historyUser)
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
getData(item) {
  this.ui.show()
  this.userAccountService.getUserAccount().then(result => {
    this.dataProfile = result.responseData.data;
    this.listpic = this.dataProfile.length;
    for(let i=0 ;i<this.dataProfile.length;i++){
      if (this.dataProfile[i]._id == this.id_User){
        this.dataProfile.splice(i, 1);
      }
      if (this.dataProfile[i].role == 'ADMIN'){
        this.dataProfile.splice(i, 1);
      }
    }
      debugger
      let index = 0,
      startingIndex = item.pageIndex * item.pageSize,
      endingIndex = startingIndex + item.pageSize;
      this.dataProfile = this.dataProfile.filter(() => {
        debugger
        index++;
        return ( index > startingIndex && index <= endingIndex ) ? true : false;
      });
      this.ui.hide()
    });

    }
}

