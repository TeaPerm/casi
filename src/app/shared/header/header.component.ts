import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LogoComponent } from "../logo/logo.component";
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { userDetailsResponse } from '../../types/user-types';
import { CreditService } from '../../services/credit.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HlmButtonDirective, RouterLink, LogoComponent,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  accessToken: string | null = null;
  username: string | null = null;
  credit: number | null = null;

  constructor(private apiService: ApiService, private router: Router, private creditService: CreditService) {}

  ngOnInit(): void {
    this.accessToken= this.apiService.getTokens().aToken;

    this.apiService.getUserDetails("user",this.accessToken!).subscribe({
      next: (response: userDetailsResponse) => {
        const {name, credit,email} = response;
        this.username = name;
        this.credit = credit;
        this.creditService.setCredit(credit); // Set the credit value in the service
      },
      error: (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    });
  }

  logout(): void {
    this.apiService.removeTokens();
    this.accessToken = this.apiService.getTokens().aToken;
    this.router.navigate(['/'])
    // Optionally navigate to the login page
    // this.router.navigate(['/login']);
  }

}
