import { Component, HostListener, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-scientific-calculator',
  templateUrl: './scientific-calculator.component.html',
  styleUrls: ['./scientific-calculator.component.css']
})
export class ScientificCalculatorComponent implements OnInit {
  currentNumber = '0';
  firstOperand: any = null;
  operator = '';
  waitForSecondOperand = false;
  isMobile: boolean = false;
  expression = ''; // Full expression for display
  resultDisplayed = false; // Flag to manage result display

  @ViewChild('calculatorCard', { static: false }) calculatorCard!: ElementRef; // Add ViewChild here


  constructor(private calculatorService: CalculatorService) {}

  ngOnInit() {
    this.checkScreenSize(); // Initialize screen size on component load
  }

  getNumber(v: string) {
    if (this.resultDisplayed) {
      this.currentNumber = v;
      this.resultDisplayed = false;
    } else if (this.waitForSecondOperand) {
      this.currentNumber = v;
      this.waitForSecondOperand = false;
    } else {
      this.currentNumber === '0' ? (this.currentNumber = v) : (this.currentNumber += v);
    }
    this.updateExpression();
  }

  getOperation(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.currentNumber);
      this.expression = `${this.firstOperand} ${op}`;
    } else if (this.operator) {
      this.firstOperand = this.calculate();
      this.expression = `${this.firstOperand} ${op}`;
    }
    this.operator = op;
    this.waitForSecondOperand = true;
    this.resultDisplayed = false;
  }

  calculate() {
    if (this.operator && this.firstOperand !== null) {
      return this.calculatorService.doCalculation(this.operator, this.firstOperand, parseFloat(this.currentNumber));
    }
    return this.firstOperand;
  }

  getResult() {
    if (this.operator) {
      const result = this.calculate();
      this.expression = `${this.expression} = ${result}`;
      this.currentNumber = String(result);
      this.firstOperand = null;
      this.operator = '';
      this.waitForSecondOperand = false;
      this.resultDisplayed = true;
    }
  }

  // Scientific functions
  getSquareRoot() {
    this.currentNumber = String(this.calculatorService.getSquareRoot(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getAbsoluteValue() {
    this.currentNumber = String(Math.abs(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getSin() {
    this.currentNumber = String(this.calculatorService.getSin(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getCos() {
    this.currentNumber = String(this.calculatorService.getCos(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getTan() {
    this.currentNumber = String(this.calculatorService.getTan(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getLog() {
    this.currentNumber = String(this.calculatorService.getLog(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getLn() {
    this.currentNumber = String(this.calculatorService.getLn(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getExponent() {
    this.currentNumber = String(Math.exp(1)); // Value of e
    this.updateExpression();
  }

  getPi() {
    this.currentNumber = String(Math.PI);
    this.updateExpression();
  }

  getExp() {
    this.currentNumber = String(Math.exp(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getFactorial() {
    const num = parseInt(this.currentNumber, 10);
    if (num < 0) {
      this.currentNumber = 'NaN';
    } else {
      let factorial = 1;
      for (let i = 1; i <= num; i++) {
        factorial *= i;
      }
      this.currentNumber = String(factorial);
    }
    this.updateExpression();
  }

  getSquare() {
    this.currentNumber = String(Math.pow(parseFloat(this.currentNumber), 2));
    this.updateExpression();
  }

  getCube() {
    this.currentNumber = String(Math.pow(parseFloat(this.currentNumber), 3));
    this.updateExpression();
  }

  getNthRoot(n: number = 2) {
    this.currentNumber = String(Math.pow(parseFloat(this.currentNumber), 1 / n));
    this.updateExpression();
  }

  getSinh() {
    this.currentNumber = String(Math.sinh(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getCosh() {
    this.currentNumber = String(Math.cosh(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  getTanh() {
    this.currentNumber = String(Math.tanh(parseFloat(this.currentNumber)));
    this.updateExpression();
  }

  // Keyboard input handling with HostListener
  @HostListener('window:keydown', ['$event'])
  handleKeyboardInput(event: KeyboardEvent) {
    const key = event.key;

    // Handle number keys (0-9)
    if (!isNaN(Number(key))) {
      this.getNumber(key);
    }

    // Handle basic operations
    if (key === '+' || key === '-' || key === '*' || key === '/') {
      this.getOperation(key);
    }

    // Handle Enter key (for calculating result)
    if (key === 'Enter') {
      this.getResult();
    }

    // Handle backspace for deletion
    if (key === 'Backspace') {
      this.deleteLastEntry();
    }

    // Handle Escape to clear the calculator
    if (key === 'Escape') {
      this.clear();
    }
  }

  // Delete last entry
  deleteLastEntry(times = 1) {
    while (times > 0 && this.expression.length > 0) {
      this.expression = this.expression.slice(0, -1);
      const parts = this.expression.split(/([+\-*/])/);
      const lastPart = parts[parts.length - 1] || '';
      
      if (['+', '-', '*', '/'].includes(lastPart)) {
        if (this.expression.length > 0) {
          this.expression = this.expression.slice(0, -1);
        }
        this.currentNumber = '';
      } else {
        this.currentNumber = lastPart || '0';
      }

      times--;
    }

    if (this.expression.length === 0) {
      this.currentNumber = '0';
    }

    this.updateExpression();
  }

  clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = '';
    this.waitForSecondOperand = false;
    this.expression = '';
    this.resultDisplayed = false;
  }

  updateExpression() {
    if (!this.resultDisplayed) {
      if (this.operator) {
        this.expression = `${this.firstOperand} ${this.operator} ${this.currentNumber}`;
      } else {
        this.expression = this.currentNumber;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    this.isMobile = width <= 768; // Adjust this breakpoint as needed
  }

  focusCalculator(): void {
    if (this.calculatorCard) {
      this.calculatorCard.nativeElement.focus();  // Focus the calculator container
    }
  }

}
