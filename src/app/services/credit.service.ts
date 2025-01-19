import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private creditSubject = new BehaviorSubject<number | null>(null);
  credit$ = this.creditSubject.asObservable();

  setCredit(credit: number) {
    this.creditSubject.next(credit);
  }

  getCredit(): number | null {
    return this.creditSubject.value;
  }
}
