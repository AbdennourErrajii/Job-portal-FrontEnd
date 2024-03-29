import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import {AuthenticationService} from "../../Services/authentication.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  userFormGroup!: FormGroup;
  errorMessage: any;
  //authUserString = localStorage.getItem('authUser');
  email=""

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
              private router :Router) {
  }

  ngOnInit(): void {
    /*if (this.authUserString) {
      // Parsez la chaîne JSON pour obtenir l'objet
      const authUser = JSON.parse(this.authUserString);
      // Accédez à la propriété "username"
      this.email = authUser.email;
    }*/
    this.userFormGroup = this.fb.group({
      role: this.fb.control(""),
      email: this.fb.control(""),
      password: this.fb.control(""),

    });
  }

  public  handleLogin() {
    let email = this.userFormGroup.value.email;
    let password = this.userFormGroup.value.password;
    let role=this.userFormGroup.value.role;
    this.authService.login(email, password,role).subscribe({
      next: (appUser) => {
        this.authService.authenticateUser(appUser).subscribe({
          next: (data) => {
            this.router.navigateByUrl('/user/home');  // Correction ici : utiliser un tableau pour spécifier le chemin
          },
          error: (err) => {

          }
        });
      },
      error: (err) => {
        this.errorMessage = err;

      }
    });
  }


  handleSigneUp() {
    this.router.navigateByUrl("/signup");
  }
}
