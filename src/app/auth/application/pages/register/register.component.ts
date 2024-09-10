import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UserRegister } from '../../../domain/UserRegister';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public registerUserForm: FormGroup;

  constructor(private AuthService: AuthService, private formBuilder: FormBuilder) {

    this.registerUserForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      birthdate: [''],
      username: [''],
      avatarURL: [''],
      email: [''],
      password: ['']
    })
  }

  viewInfo() {
    const userData: UserRegister = this.registerUserForm.value as UserRegister;

    console.log(userData)

    this.AuthService.createUser(userData).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error)
      })
    ).subscribe((resp: any) => { 
      console.log(resp)
    });
  }




}
