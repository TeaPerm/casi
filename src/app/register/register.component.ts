import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { registerResponse } from '../types/user-types';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ SharedModule , FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(): void {
    this.apiService.login(this.email, this.password).subscribe({
      next: (response: registerResponse) => {
        console.log('Login successful', response);

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
