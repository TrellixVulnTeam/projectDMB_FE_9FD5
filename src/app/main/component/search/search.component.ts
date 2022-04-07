import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpServices } from 'src/app/service/http.service';
import { UiService } from 'src/app/ui.service';
// import { SpinnerCircularModule } from 'spinners-angular/spinner-circular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // searchUser: FormGroup;
  public findpeople : FormGroup;
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

  slideage(value: number) {
    if (value >= 1) {
      return Math.round(value /1 ) + 'ปี';
    }

    return value;
  }

  slideheight(value: number) {
    if (value >= 1) {
      return Math.round(value /1 );
    }

    return value;
  }
  newProfile:any
  id_User:any
  constructor(
    private ui: UiService,
    public http: HttpServices,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SearchComponent>,
  ) {}

  ngOnInit(): void {
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    console.log( this.newProfile);
    this.id_User = this.newProfile._id


    this.findpeople  = this.formBuilder.group({
      type: new FormControl({ value: null, disabled: false }),
      gender: new FormControl({ value: null, disabled: false }),
      province: new FormControl({ value: null, disabled: false }),
      age: new FormControl({ value: null, disabled: false }),
      height: new FormControl({ value: null, disabled: false }),
      _id: new FormControl({ value: null, disabled: false }),

    });
  }
  onCancel(){
    this.dialogRef.close();
  }
  logout(){
    localStorage.removeItem('Authorization');
    this.router.navigate(['login', {}])
  }
  search(){
    this.ui.show()
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender == null&&
      this.findpeople.value.province == null&&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchType',{
        type: this.findpeople.value.type,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender != null&&
      this.findpeople.value.province == null&&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchGender',{
        gender: this.findpeople.value.gender,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null&&
      this.findpeople.value.province != null&&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchProvince',{
        province: this.findpeople.value.province,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null&&
      this.findpeople.value.province == null&&
      this.findpeople.value.age != null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchAge',{
        age: this.findpeople.value.age,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null&&
      this.findpeople.value.province == null&&
      this.findpeople.value.age == null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchHeight',{
        height: this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchAll',{
      type: this.findpeople.value.type,
      gender:this.findpeople.value.gender,
      province:this.findpeople.value.province,
      age:this.findpeople.value.age,
      height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchTypeGender',{
      type: this.findpeople.value.type,
      gender:this.findpeople.value.gender,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchTypeProvince',{
      type: this.findpeople.value.type,
      province:this.findpeople.value.province,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchTypeAge',{
      type: this.findpeople.value.type,
      age:this.findpeople.value.age,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchTypeHeight',{
      type: this.findpeople.value.type,
      height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchGenderProvince',{
        gender: this.findpeople.value.gender,
        province:this.findpeople.value.province,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchGenderAge',{
        gender: this.findpeople.value.gender,
        age:this.findpeople.value.age,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchGenderHeight',{
        gender: this.findpeople.value.gender,
        height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchProvinceAge',{
        province: this.findpeople.value.province,
        age:this.findpeople.value.age,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchProvinceHeight',{
        province: this.findpeople.value.province,
        height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchAgeHeight',{
        age: this.findpeople.value.age,
        height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchTGP',{
        type: this.findpeople.value.type,
        gender: this.findpeople.value.gender,
        province:this.findpeople.value.province,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchTGA',{
        type: this.findpeople.value.type,
        gender: this.findpeople.value.gender,
        age:this.findpeople.value.age,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type != null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province == null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchTGH',{
        type: this.findpeople.value.type,
        gender: this.findpeople.value.gender,
        height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height == null ){
      this.http.postData('/services/webasset/api/searchGPA',{
        gender: this.findpeople.value.gender,
        province: this.findpeople.value.province,
        age:this.findpeople.value.age,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender != null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age == null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchGPH',{
        gender: this.findpeople.value.gender,
        province: this.findpeople.value.province,
        height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }
    if(this.findpeople.value.type == null &&
      this.findpeople.value.gender == null &&
      this.findpeople.value.province != null &&
      this.findpeople.value.age != null &&
      this.findpeople.value.height != null ){
      this.http.postData('/services/webasset/api/searchPAH',{
        province: this.findpeople.value.province,
        age: this.findpeople.value.age,
        height:this.findpeople.value.height,
        _id: this.id_User
      }).then(result =>{
       this.ui.hide()
        this.dialogRef.close(result);
      });
    }


    // this.http.postData('/services/webasset/api/search',{
    //   type: this.findpeople.value.type,
    //   gender:this.findpeople.value.gender,
    //   province:this.findpeople.value.province,
    //   age:this.findpeople.value.age,
    //   height:this.findpeople.value.height,
    // }).then(result =>{
    //  this.ui.hide()
    //   this.dialogRef.close(result);
    // });


  }
}
