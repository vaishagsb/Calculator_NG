import { Component, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ScientificCalculatorComponent } from './scientific-calculator/scientific-calculator.component'; // Import the component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isMenuOpen = false;
  isScreenLarge = window.innerWidth > 768;

  // Reference to the scientific calculator component
  @ViewChild('calculatorCard') calculatorCard: ElementRef | null = null;
  @ViewChild(ScientificCalculatorComponent) scientificCalculatorComponent: ScientificCalculatorComponent | null = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isScreenLarge = (event.target as Window).innerWidth > 768;
  }

  ngAfterViewInit() {
    // Component has been loaded, child components are accessible here
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToCalculator(): void {
    if (this.calculatorCard) {
      this.calculatorCard.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Focus the calculator after scrolling
    if (this.scientificCalculatorComponent) {
      this.scientificCalculatorComponent.focusCalculator();
    }
  }
}
