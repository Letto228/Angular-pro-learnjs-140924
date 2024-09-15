import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppComponent {
  @Input() name: string = '';
  
  @Output() clicked = new EventEmitter<string>();
  
  title = '01-web-component';

  onCLick() {
    this.clicked.emit(this.name + Date.now());
  }
}
