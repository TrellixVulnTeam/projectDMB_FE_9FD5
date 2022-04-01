import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServices } from 'src/app/service/http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
dataView:any;
profile:FormGroup
admin:boolean
  constructor(
    public http: HttpServices,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewComponent>,
  ) { }
  account:FormGroup
  ngOnInit(): void {
   debugger
    this.dataView = this.data.dataKey
    console.log( this.dataView);
    this.profile  = this.formBuilder.group({
      nickname: new FormControl({ value: '', disabled: true }),
      province: new FormControl({ value: '', disabled: true }),
      age: new FormControl({ value: '', disabled: true }),
      picture: new FormControl({ value: '', disabled: true }),
      weight: new FormControl({ value: '', disabled: true }),
      height: new FormControl({ value: '', disabled: true }),
      gender: new FormControl({ value: '', disabled: true }),
      description: new FormControl({ value: '', disabled: true }),
      facebook: new FormControl({ value: '', disabled: true }),
      line: new FormControl({ value: '', disabled: true }),
      role: new FormControl({ value: '', disabled: true }),
      ig: new FormControl({ value: '', disabled: true }),
      phone: new FormControl({ value: '', disabled: true }),
      type: new FormControl({ value: '', disabled: true }),
    });
    this.profile.patchValue({
      nickname:this.dataView.nickname,
      province:this.dataView.province,
      age:this.dataView.age,
      picture:this.dataView.picture,
      weight:this.dataView.weight,
      height:this.dataView.height,
      gender:this.dataView.gender,
      description:this.dataView.description,
      facebook:this.dataView.facebook,
      line:this.dataView.line,
      role:this.dataView.role,
      phone: "0" +this.dataView.phone,
      ig:this.dataView.ig,
      type:this.dataView.type,
    })
   
    if(this.dataView.phone == null || this.dataView.phone == ''){
      debugger
      this.profile.patchValue({
        phone: '-',
      })
    }
    console.log(this.profile.value.phone);
  }

}
