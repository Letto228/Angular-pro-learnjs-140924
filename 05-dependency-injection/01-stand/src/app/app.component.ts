import { ChangeDetectorRef, Component, forwardRef, inject, Inject, Injectable, InjectionToken, Injector } from '@angular/core';

@Injectable()
class Deps {
  // constructor(private readonly test: Test) {}
}

@Injectable()
class Test {
  constructor(private readonly deps: Deps) {}

  method() {}

  delete() {}
}

@Injectable()
class TestScope {
  constructor(private readonly deps: Deps) {}

  method() {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: []
})
export class AppComponent {
  title = 'stand';

  private readonly componentInjector = inject(Injector);

  constructor() {
    const token = new InjectionToken('My token');
    const injector = Injector.create({
      parent: this.componentInjector,
      providers: [
        // {
        //   provide: 'useValue',
        //   useValue: Test,
        // },
        // {
        //   provide: 'useValue',
        //   useValue: 123,
        // },
        // {
        //   provide: 'useValue',
        //   useValue: 'test',
        // },
        // {
        //   provide: 'useClass',
        //   useClass: Test,
        // },
        // {
        //   provide: Test,
        //   useClass: Test,
        // },
        Deps,
        Test,
        // {
        //   provide: TestScope,
        //   useExisting: Test,
        // },
        {
          provide: 'useFactory',
          useFactory: () => inject(Test).method(),
        },
      ],
    });

    console.log(injector.get(ChangeDetectorRef));
    // console.log(injector.get('useValue'));
    // console.log(injector.get(Test));
    // console.log(injector.get(Test) === injector.get('useExisting'));
    // console.log(injector.get(TestScope));
  }
}
