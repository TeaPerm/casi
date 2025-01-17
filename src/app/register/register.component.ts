import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { registerResponse } from '../types/user-types';
import { LogoComponent } from '../shared/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ SharedModule , FormsModule, LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(): void {
    this.apiService.register(this.email, this.username, this.password).subscribe({
      next: (response: registerResponse) => {
        console.log('register successful', response);
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    });
  }

}
