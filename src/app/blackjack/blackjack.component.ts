import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent {

  imageNames: string[] = [
    'c1.png',
    'c2.png',
    'd3.png',
    's3.png',
    'h1.png',
  ];
}
