import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HlmButtonDirective, HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'casi';
  hideHeader: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const noHeaderRoutes = ['/register'];
      this.hideHeader = noHeaderRoutes.includes(this.router.url);
    });
  }
}
