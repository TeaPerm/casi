import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacebetsComponent } from './placebets/placebets.component';
import { GameComponent } from "./game/game.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  imports: [PlacebetsComponent, GameComponent, CommonModule],
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {

  roomNumber!: string;
  gameStarted: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.roomNumber = this.route.snapshot.paramMap.get('roomNumber')!;
  }

  startGame() {
    this.gameStarted = true;
  }
}
