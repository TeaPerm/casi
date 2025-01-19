import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { RoomComponent } from "./room/room.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmInputDirective, FormsModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})

export class BlackjackComponent {
  roomNumber: string | null = null;
  enteredRoomCode: string = '';

  constructor(private router: Router) {}

  createRoom() {
    this.roomNumber = (Math.floor(1000 + Math.random() * 9000)).toString();
    this.router.navigate([`/blackjack/${this.roomNumber}`]);
  }

  joinRoom() {
    if (this.enteredRoomCode) {
      this.roomNumber = this.enteredRoomCode;
      this.router.navigate([`/blackjack/${this.roomNumber}`]);
    }
  }
}
