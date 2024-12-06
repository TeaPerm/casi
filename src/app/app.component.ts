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
export class AppComponent {

  title = 'casi';
  hideHeader: boolean = false;
  data: any;

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(() => {
      const noHeaderRoutes = ['/register'];
      this.hideHeader = noHeaderRoutes.includes(this.router.url);
    });
  }
}
