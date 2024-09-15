import { inject, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [BrowserModule],
})
export class AppModule {
  private readonly injector = inject(Injector);
  ngDoBootstrap() {}

  constructor() {
    const appComponentElement = createCustomElement(AppComponent, {injector: this.injector});

    customElements.define(`app-custom`, appComponentElement);
  }
}
