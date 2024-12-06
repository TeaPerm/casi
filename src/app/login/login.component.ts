import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { loginResponse } from '../types/user-types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmInputDirective, HlmButtonDirective, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(): void {
    this.apiService.login(this.email, this.password).subscribe({
      next: (response: loginResponse) => {
        console.log('Login successful', response);
        const { accessToken, refreshToken } = response;
        this.apiService.setTokens(accessToken, refreshToken)
        setTimeout(() => {
          location.reload()}, 0
        )
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    });
  }

}
