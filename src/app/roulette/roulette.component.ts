import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

interface Bet {
  cellType: 'number' | 'color';
  value: string;
  amount: number;
}

@Component({
  selector: 'app-roulette',
  imports: [CommonModule, HlmButtonDirective], 
  standalone: true,
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.scss'],
})
export class RouletteComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;
  options = [
    '0',
    '32',
    '15',
    '19',
    '4',
    '21',
    '2',
    '25',
    '17',
    '34',
    '6',
    '27',
    '13',
    '36',
    '11',
    '30',
    '8',
    '23',
    '10',
    '5',
    '24',
    '16',
    '33',
    '1',
    '20',
    '14',
    '31',
    '9',
    '22',
    '18',
    '29',
    '7',
    '28',
    '12',
    '35',
    '3',
    '26',
  ];  
  startAngle = 0;
  arc = (2 * Math.PI) / (this.options.length || 1);
  spinTime = 0;
  spinAngleStart = Math.random() * 10 + 10;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  spinTimeout: any = -1;
  selected = '';
  size = 320;

  placedBets: Bet[] = [];
  chipValues = [100, 250, 500, 1000, 2500, 5000];
  selectedChipValue = 5;

  ngAfterViewInit(): void {
    this.drawRouletteWheel();
  }

  ngOnInit(): void {}

  get canvas(): HTMLCanvasElement {
    return this.canvasRef!.nativeElement;
  }

  getRouletteColor(value: string): string {
    if (value === '0') {
      return 'green';
    }
  
    const num = parseInt(value, 10);
    const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return reds.includes(num) ? 'red' : 'black';
  }
  

  drawRouletteWheel() {
    if (this.canvas) {
      const outsideRadius = this.size * 0.4;
      const textRadius = this.size * 0.35;
      const insideRadius = this.size * 0.3;
  
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx != null) {
        this.ctx.clearRect(0, 0, this.size, this.size);
  
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 2;
  
        const fontSize = Math.floor(this.size * 0.04);
        this.ctx.font = `bold ${fontSize}px Helvetica, Arial`;
  
        for (let i = 0; i < this.options.length; i++) {
          const angle = this.startAngle + i * this.arc;
          this.ctx.fillStyle =this.getRouletteColor(this.options[i]);
  
          this.ctx.beginPath();
          this.ctx.arc(
            this.size / 2,
            this.size / 2,
            outsideRadius,
            angle,
            angle + this.arc,
            false
          );
          this.ctx.arc(
            this.size / 2,
            this.size / 2,
            insideRadius,
            angle + this.arc,
            angle,
            true
          );
          this.ctx.stroke();
          this.ctx.fill();
  
          this.ctx.save();
          this.ctx.fillStyle = '#fff';
  
          this.ctx.translate(
            this.size / 2 + Math.cos(angle + this.arc / 2) * textRadius,
            this.size / 2 + Math.sin(angle + this.arc / 2) * textRadius
          );
          this.ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
  
          const text = this.options[i];
          this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0);
          this.ctx.restore();
        }
  
        const arrowHalfWidth = Math.floor(this.size * 0.024);
        const arrowLength = Math.floor(this.size * 0.1);
        const arrowOffset = outsideRadius + arrowLength;
  
        const shadowOffsetX = -arrowHalfWidth / 2;
        const shadowOffsetY = -arrowHalfWidth / 2;
  
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.moveTo(this.size / 2 - arrowHalfWidth + shadowOffsetX,
                        this.size / 2 - (arrowOffset + shadowOffsetY));
        this.ctx.lineTo(this.size / 2 + arrowHalfWidth + shadowOffsetX,
                        this.size / 2 - (arrowOffset + shadowOffsetY));
        this.ctx.lineTo(this.size / 2 + arrowHalfWidth + shadowOffsetX,
                        this.size / 2 - (outsideRadius - shadowOffsetY));
        this.ctx.lineTo(this.size / 2 + arrowHalfWidth*2 + shadowOffsetX,
                        this.size / 2 - (outsideRadius - shadowOffsetY));
        this.ctx.lineTo(this.size / 2 + shadowOffsetX,
                        this.size / 2 - (outsideRadius - arrowHalfWidth - shadowOffsetY));
        this.ctx.lineTo(this.size / 2 - arrowHalfWidth*2 + shadowOffsetX,
                        this.size / 2 - (outsideRadius - shadowOffsetY));
        this.ctx.lineTo(this.size / 2 - arrowHalfWidth + shadowOffsetX,
                        this.size / 2 - (outsideRadius - shadowOffsetY));
        this.ctx.lineTo(this.size / 2 - arrowHalfWidth + shadowOffsetX,
                        this.size / 2 - (arrowOffset + shadowOffsetY));
        this.ctx.fill();
  
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
      }
    }
  }

  get chunks3(): string[][] {
    const arr = Array.from({ length: 36 }, (_, i) => (i + 1).toString());
    const result: string[][] = [];
    for (let i = 0; i < arr.length; i += 12) {
      result.push(arr.slice(i, i + 12));
    }
    return result;
  }
  

  onCellClick(value: string, cellType: 'number' | 'color') {
    this.placedBets.push({
      cellType,
      value,
      amount: this.selectedChipValue
    });
    console.log(`Bet placed on ${value} (${cellType}) for ${this.selectedChipValue}`);
  }
  

  spin() {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel();
  }

  rotateWheel() {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    let spinAngle =
      this.spinAngleStart -
      this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI) / 180;
    this.drawRouletteWheel();
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 30);
  }

  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    let degrees = (this.startAngle * 180) / Math.PI + 90;
    let arcd = (this.arc * 180) / Math.PI;
    let index = Math.floor((360 - (degrees % 360)) / arcd);
    if (this.ctx) {
      this.ctx.save();
      this.ctx.font = 'bold 30px Helvetica, Arial';
      const text = this.options[index];
      this.selected = text;
      this.ctx.fillText(
        text,
        this.size / 2 - this.ctx.measureText(text).width / 2,
        this.size / 2 + 10
      );
      this.evaluateBets(this.selected);
      this.ctx.restore();
    }
  }

  easeOut(t: number, b: number, c: number, d: number) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  evaluateBets(spinResult: string) {
    let totalWin = 0;
    let totalBet = 0;
    const spinColor = this.getRouletteColor(spinResult);

    for (const bet of this.placedBets) {
      totalBet += bet.amount;
      let betWin = 0;

      if (bet.cellType === 'number') {
        if (bet.value === spinResult) {
          betWin = bet.amount * 36;
        }
      } else if (bet.cellType === 'color') {
        if (bet.value === spinColor) {
          betWin = bet.amount * 2;
        }
      }
      totalWin += betWin;
    }

    const profit = totalWin - totalBet;
    if (profit > 0) {
      console.log(`Gratulálok, nyertél: +${profit} $`);
    } else if (profit < 0) {
      console.log(`Sajnos vesztettél: ${profit} $`);
    } else {
      console.log(`Semleges eredmény (break even).`);
    }

    this.placedBets = [];
  }
}
