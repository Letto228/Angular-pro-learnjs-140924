import { Component } from '@angular/core';


@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
})
export class ZooComponent {

  // animals ?

  say() {
    this.animals.forEach(animal => animal.say());
  }
}
