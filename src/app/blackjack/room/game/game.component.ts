import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BlackjackService } from '../../../services/blackjack.service';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, HlmBadgeDirective],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Output() isGameOver = new EventEmitter<boolean>();
  dealerHand: string[] = [];
  playerHand: string[] = [];
  deck: string[] = [];
  gameStarted: boolean = false;
  showHiddenCard: boolean = true;
  gameResult: string = '';

  constructor(private BlackjackService: BlackjackService) {}

  ngOnInit(): void {
  }

  initializeDeck() {
    const suits = ['c', 'd', 'h', 's'];
    const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
    this.deck = [];
    for (const suit of suits) {
      for (const value of values) {
        this.deck.push(`${suit}${value}`);
      }
    }
    this.shuffleDeck();
  }

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  startGame() {
    console.log('Game started!');
    this.dealerHand = [];
    this.playerHand = [];
    this.deck = [];
    this.initializeDeck();
    this.dealInitialCards();
    this.gameStarted = true;
    console.log('Dealer hand:', this.dealerHand);
    console.log('User hand:', this.playerHand);
  }

  dealInitialCards() {
    this.playerHand.push(this.drawCard());
    this.playerHand.push(this.drawCard());
    this.dealerHand.push(this.drawCard());
  }

  drawCard(): string {
    if (this.deck.length === 0) {
      throw new Error('No more cards in the deck');
    }
    return this.deck.pop()!;
  }

  getHandValue(hand: string[]): number {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
      const cardValue = card.slice(1);
      if (cardValue === '1') {
        value += 11;
        aces += 1;
      } else if (['11', '12', '13'].includes(cardValue)) {
        value += 10;
      } else {
        value += parseInt(cardValue, 10);
      }
    }

    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  }

  hit() {
    this.playerHand.push(this.drawCard());
    const playerValue = this.getHandValue(this.playerHand);
    if (playerValue > 21) {
     this.determineOutcome();
    }
  }

  stand() {
    this.showHiddenCard = false;
    this.dealerDraw();
  }

  dealerDraw() {
    let dealerValue = this.getHandValue(this.dealerHand);
    if (dealerValue < 17) {
      setTimeout(() => {
        this.dealerHand.push(this.drawCard());
        dealerValue = this.getHandValue(this.dealerHand);
        console.log('Dealer draws:', this.dealerHand);
        this.dealerDraw();
      }, 1000);
    } else {
      console.log('Dealer stands with value:', dealerValue);
      this.determineOutcome();
    }
  }

  determineOutcome() {
    const playerValue = this.getHandValue(this.playerHand);
    const dealerValue = this.getHandValue(this.dealerHand);

    if (playerValue > 21) {
      this.gameResult = 'Player busts!';
    } else if (dealerValue > 21) {
      this.gameResult = 'Dealer busts! Player wins!';
    } else if (playerValue > dealerValue) {
      this.gameResult = 'Player wins!';
    } else if (playerValue < dealerValue) {
      this.gameResult = 'Dealer wins!';
    } else {
      this.gameResult = 'It\'s a tie!';
    }

    this.isGameOver.emit(true)
    this.BlackjackService.setGameOver(true);
  }

  getGameStatus(): boolean{
    return this.BlackjackService.getGameOver();
  }
}
