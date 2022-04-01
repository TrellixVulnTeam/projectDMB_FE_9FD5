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
    'Nakhon Ratchasima',
    'Chiang Mai',
    'Kanchanaburi',
    'Tak',
    'Ubon Ratchathani',
    'Surat Thani',
    'Chaiyaphum',
    'Mae Hong Son',
    'Phetchabun',
    'Lampang',
    'Udon Thani',
    'Chiang Rai',
    'Nan',
    'Loei',
    'Khon Kaen',
    'Phitsanulok',
    'Buri Ram',
    'Nakhon Si Thammarat',
    'Sakon Nakhon',
    'Nakhon Sawan',
    'Sisaket',
    'Kamphaeng Phet',
    'Roi Et',
    'Surin',
    'Uttaradit',
    'Songkhla',
    'Sa Kaeo',
    'Kalasin',
    'Uthai Thani',
    'Phrae',
    'Prachuap Khiri Khan',
    'Chanthaburi',
    'Phayao',
    'Phetchaburi',
    'Lop Buri',
    'Chumphon',
    'Nakhon Phanom',
    'Suphan Buri',
    'Chachoengsao',
    'Maha Sarakham',
    'Ratchaburi',
    'Trang',
    'Prachinburi',
    'Krabi',
    'Phichit',
    'Yala',
    'Lamphun',
    'Chon Buri',
    'Narathiwat',
    'Mukdahan',
    'Bueng Kan',
    'Phang Nga',
    'Yasothon',
    'Nong Bua Lamphu',
    'Saraburi',
    'Rayong',
    'Phatthalung',
    'Ranong',
    'Amnat Charoen',
    'Nong Khai',
    'Trat',
    'Ayutthaya',
    'Satun',
    'Chainat',
    'Nakhon Pathom',
    'Nakhon Nayok',
    'Pattani',
    'Bangkok',
    'Pathum Thani',
    'Samut Prakan',
    'Ang Thong',
    'Samut Sakhon',
    'Sing Buri',
    'Nonthaburi',
    'Phuket',
    'Samut Songkhram',
    'Sukhothai',
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

  constructor(
    private ui: UiService,
    public http: HttpServices,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SearchComponent>,
  ) {}

  ngOnInit(): void {
    this.findpeople  = this.formBuilder.group({
      type: new FormControl({ value: null, disabled: false }),
      gender: new FormControl({ value: null, disabled: false }),
      province: new FormControl({ value: null, disabled: false }),
      age: new FormControl({ value: null, disabled: false }),
      height: new FormControl({ value: null, disabled: false }),
    });
  }

  onSubmit(){

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
    this.findpeople.value
    this.http.postData('/services/webasset/api/search',{
      type: this.findpeople.value.type,
      gender:this.findpeople.value.gender,
      province:this.findpeople.value.province,
      age:this.findpeople.value.age,
      height:this.findpeople.value.height,
    }).then(result =>{
     this.ui.hide()
      this.dialogRef.close(result);
      // this.listlike = result
    });


  }
}
