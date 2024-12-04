import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HlmInputDirective,HlmButtonDirective,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Handle successful login, e.g., navigate to another page
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    });
  }

}
