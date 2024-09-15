import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Pipe({
  name: 'myAsync',
  pure: false,
})
export class MyAsyncPipe<T> implements PipeTransform, OnDestroy {
  private value: T | null = null;
  private subscription: Subscription | null = null;
  private currentStream$: Observable<T> | null = null;

  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  transform(stream$: Observable<T>): T | null {
    if (this.currentStream$ !== stream$) {
      this.subscription?.unsubscribe();

      this.currentStream$ = stream$;
      this.value = null;
      this.subscription = null;
    }

    if (!this.subscription) {
      this.subscription = stream$.subscribe(value => {
        this.value = value;
        this.changeDetectorRef.markForCheck();
      });
    }

    return this.value;
  }

}
