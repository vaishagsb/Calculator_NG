// calculator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  doCalculation(operator: string, firstOperand: number, secondOperand: number): number {
    switch (operator) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '*': return firstOperand * secondOperand;
      case '/': return firstOperand / secondOperand;
      default: return secondOperand;
    }
  }

  getSquareRoot(value: number): number {
    return Math.sqrt(value);
  }

  getPower(value: number): number {
    return Math.pow(value, 2);
  }

  getSin(value: number): number {
    return Math.sin(value);
  }

  getCos(value: number): number {
    return Math.cos(value);
  }

  getTan(value: number): number {
    return Math.tan(value);
  }

  getLog(value: number): number {
    return Math.log10(value);
  }

  getLn(value: number): number {
    return Math.log(value);
  }

  getExponent(): number {
    return Math.E;
  }

  getFactorial(n: number): number {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
