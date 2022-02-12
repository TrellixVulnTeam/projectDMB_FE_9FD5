import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpServices } from 'src/app/service/http.service';
import { LikeUserService } from 'src/app/service/likeUser.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  listlike:any;
  id_User:number
  likeUser: FormGroup;
  public newProfile: any;
  public roleAccount:boolean;

  constructor(
    public http: HttpServices,
    private formBuilder: FormBuilder,
    public likeUserService :LikeUserService,
  ) { }

  ngOnInit(): void {
    this.likeUser  = this.formBuilder.group({
      user1: new FormControl({ value: '', disabled: false }),
      user2: new FormControl({ value: '', disabled: false }),
      id_chat: new FormControl({ value: null, disabled: false }),
      status: new FormControl({ value: null, disabled: false }),
    });
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    this.id_User = this.newProfile._id
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
    this.http.postData('/services/webasset/api/whereListlike',{user2:this.id_User}).then(result =>{
      debugger
      console.log(result);
      this.listlike = result
    });
  }
  like(item,id,index){
    // this.listAction.push(item)
    this.listlike.splice(index, 1);
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
    this.http.postData('/services/webasset/api/deleteLike/{{item}}',{user2:this.id_User}).then(result =>{
      debugger
      console.log(result);
      this.listlike = result
    });
    // this.listAction.push(item)
    this.listlike.splice(index, 1);

  }

}
