import { Component, inject, Injector, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DeclaratedComponent } from './declarated/declarated.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'insert-stand';

  @ViewChild('viewContainer', {static: true, read: ViewContainerRef})
  private container!: ViewContainerRef;

  private readonly injector = inject(Injector);

  readonly componentInjector = Injector.create({
    providers: [{provide: 'name', useValue: 'Egor'}],
    parent: this.injector
  })
  readonly component$ = from(
    import('./undeclarated/undeclarated.component').then(m => m.UndeclaratedComponent)
  )

  onClickComponent() {
    const injector = Injector.create({
      providers: [{provide: 'name', useValue: 'Egor'}],
      parent: this.injector
    });

    // this.container.createComponent(DeclaratedComponent, {injector});

    import('./undeclarated/undeclarated.component').then(({UndeclaratedComponent}) => {
      this.container.createComponent(UndeclaratedComponent, {injector});
    })
  }

  onClickTemplate(template: TemplateRef<unknown>) {
    this.container.createEmbeddedView(template, {$implicit: 'Egor', adres: 'Dom'});
  }

  onClickClear() {
    this.container.clear();
  }

}
