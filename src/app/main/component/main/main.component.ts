import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public roleAccount:boolean;
  public newProfile: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    const profile = localStorage.getItem('Profile')
    this.newProfile = JSON.parse(profile)
    if(this.newProfile.role == 'ADMIN'){
      this.roleAccount = true
    }
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login', {}])
  }
}
