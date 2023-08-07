import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loginError: string = '';
  fromSubmitted : boolean = false;

  constructor(private loginservice : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginProcess() {
    this.fromSubmitted = true;
    if (this.formGroup.valid) {      
      this.loginservice.onLogin(this.formGroup.value).subscribe(
        (success: any) => {
          console.log(success);
          if (success.token && success.token.length > 0) { // Fix the property name here
            this.router.navigate(['meetingroomlist']);
          } 
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          alert('Invalid Credentials');
        }
      );
    }
  }
}