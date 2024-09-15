import { ChangeDetectionStrategy, Component, computed, effect, inject, Injector, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly injector = inject(Injector);

  // title = 'signals';
  get title(): string {
    console.log('CD called');

    return 'signals';
  }

  readonly count = signal(0);

  constructor() {
    // console.log(this.count());

    // this.count.set(2);

    // console.log(this.count());

    // this.count.update(value => value + 1);

    // console.log(this.count());

    // setInterval(() => {
    //   this.count.update(value => value + 1);
    // }, 1000)

    // ------------------------------

    // const doubleCount = computed(() => this.count() * 2);

    // console.log(doubleCount()); // вычисляется
    // console.log(doubleCount()); // не вычисляется (кэш)
    // console.log(doubleCount()); // не вычисляется (кэш)

    // this.count.set(2);

    // console.log(doubleCount()); // вычисляется
    // console.log(doubleCount()); // не вычисляется (кэш)

    // ------------------------------

    // const showCount = signal(false);
    // const count = signal(0);

    // const conditionalCount = computed(() => {
    //   if (showCount()) {
    //     return `Thre count is ${count()}`;
    //   }

    //   return `Nothig`;
    // })

    // console.log(conditionalCount());

    // showCount.set(true);

    // console.log(conditionalCount());

    // showCount.set(false);

    // console.log(conditionalCount());

    // ------------------------------

    const effectRef = effect(onCleanup => {
      console.log('Count: ', this.count());

      onCleanup(() => {
        console.log('Destroy effect');
      });
    });

    setTimeout(() => {
      effectRef.destroy();
    }, 6000);

    setInterval(() => {
      this.count.update(value => value + 1);
    }, 1000)
  }
}
