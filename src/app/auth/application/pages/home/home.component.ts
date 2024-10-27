import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../infrastructure/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  authForm: FormGroup;



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const loginData = this.authForm.value
      this.authService.login(loginData).subscribe({
        next: () => {

        },
        error: (err) => {
          alert(err.message)
        }
      });

    }
  }

}
