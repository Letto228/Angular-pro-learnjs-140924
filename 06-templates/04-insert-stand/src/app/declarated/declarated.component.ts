import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-declarated',
  templateUrl: './declarated.component.html',
  styleUrls: ['./declarated.component.css']
})
export class DeclaratedComponent {
  readonly name = inject('name' as any, {optional: true});
}
