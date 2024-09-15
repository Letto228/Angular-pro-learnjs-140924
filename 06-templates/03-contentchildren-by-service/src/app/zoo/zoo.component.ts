import { Component, ContentChildren, QueryList } from '@angular/core';
import { Animal } from '../animal';


@Component({
  selector: 'app-zoo',
  templateUrl: './zoo.component.html',
})
export class ZooComponent {

  // animals ?
  // @ContentChildren('animal') animals: QueryList<any> = new QueryList();
  @ContentChildren(Animal) animals: QueryList<Animal> = new QueryList<Animal>();

  say() {
    this.animals.forEach(animal => animal.say());
  }
}
