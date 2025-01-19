import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  private gameOverSubject = new BehaviorSubject<boolean>(true);
  isGameOver$ = this.gameOverSubject.asObservable();

  setGameOver(status: boolean): void {
    this.gameOverSubject.next(status);
  }

  getGameOver(): boolean {
    return this.gameOverSubject.value;
  }
}
