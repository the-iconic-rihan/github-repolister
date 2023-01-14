import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GithubServicesService } from '../../services/github-services.service';
import { Model } from '../../model/model'
import { ThemePalette } from '@angular/material/core';
export interface ChipColor {
  name: string;
  color: ThemePalette;
}
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetails implements OnInit {
  userForm: any;
  userArray = new Model();
  user: any;
  repositories: any[] = [];
  errorMessage = "";
  userName: any;

  loading = false;
  constructor(private http: HttpClient, private svc: GithubServicesService) { }

  getErrorMessage() {
    if (this.username.errors?.['required']) {
      return 'You must enter a value';
    }

    return this.username.errors?.['pattern'] ? 'Not a valid username' : '';
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern('^[ A-Za-z0-9_@./#&+-]*$')])
    })

  }
  public get username(): FormControl {
    return this.userForm.get('userName') as FormControl;
  }
  onSubmit() {
    this.loading = true;
    // setTimeout(() => {
    //   console.log("sleeping");
    // }, 5000)
    this.svc.fetchUserProfile(this.userForm.value)
      .subscribe(
        (data: any) => {
          this.user = data;
          this.loading = false;

          this.http.get(data.repos_url)
            .subscribe({
              next: (repos: any) => this.repositories = repos,
              error: (e: any) => this.errorMessage = 'Error: ' + e.statusText,

            })


        }, (error: any) => {
          this.errorMessage = 'Invalid Github username  '
          this.loading = false;
        }
      )
  }
}

