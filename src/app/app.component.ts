import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HlmButtonDirective, HeaderComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'casi';
  hideHeader: boolean = false;
  data: any;

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(() => {
      const noHeaderRoutes = ['/register'];
      this.hideHeader = noHeaderRoutes.includes(this.router.url);
    });
  }

  ngOnInit() {
    this.getData();
  }

  // Fetch data and log to console
  getData() {
    this.apiService.getData('').subscribe(
      (response) => {
        console.log('Data received:', response);  // Logs the API response to the console
        this.data = response;  // Store the data in the component's property
      },
      (error) => {
        console.error('Error:', error);  // Log any errors to the console
      }
    );
  }
}
