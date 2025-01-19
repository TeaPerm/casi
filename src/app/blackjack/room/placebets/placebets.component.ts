import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { CreditService } from '../../../services/credit.service';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { FormsModule } from '@angular/forms';
import { BlackjackService } from '../../../services/blackjack.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowSmallDownSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-placebets',
  standalone: true,
  imports: [HlmButtonDirective, HlmInputDirective, FormsModule, NgIcon],
  templateUrl: './placebets.component.html',
  styleUrls: ['./placebets.component.css'],
  viewProviders: [provideIcons({ heroArrowSmallDownSolid })]
})
export class PlacebetsComponent implements OnInit {

  @Output() gameStarted = new EventEmitter<void>();
  @Output() hitEvent = new EventEmitter<void>();
  @Output() standEvent = new EventEmitter<void>();
  @Input() isGameOver: boolean = true;
  standDisabled: boolean = false;

  credit: number | null = null;
  betAmount: number = 50;
  gameStartedFlag: boolean = false;

  constructor(private creditService: CreditService, private BlackjackService: BlackjackService) {}

  ngOnInit(): void {
    this.creditService.credit$.subscribe(credit => {
      this.credit = credit;
    });
  }

  changeBet(newBet: number) {
    this.betAmount = Math.round(newBet);
  }

  placeBet(){
    this.gameStarted.emit();
    this.gameStartedFlag= true;
    this.BlackjackService.setGameOver(false);
  }

  hit(){
    this.hitEvent.emit();
  }

  stand(){
    this.standEvent.emit();
    this.standDisabled = true;
    const interval = setInterval(() => {
      if (this.getIsGameOver()) {
        this.standDisabled = false;
        clearInterval(interval);
      }
    }, 100);
  }

  getIsGameOver(): boolean{
    return this.BlackjackService.getGameOver();
  }
}
