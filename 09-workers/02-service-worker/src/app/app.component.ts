import { Component, inject } from '@angular/core';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'service-worker';

  private readonly swUpdate = inject(SwUpdate);
  private readonly swPush = inject(SwPush);

  constructor() {
    this.swUpdate.versionUpdates
      .pipe(filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY'))
      .subscribe(event => {
        if (confirm('Есть новая версия, хотите установить?')) {
          document.location.reload();
        }
      });

    timer(1000 * 60 * 60 * 2)
      .pipe(switchMap(() => this.swUpdate.checkForUpdate()))
      .subscribe(console.log);

    Notification.requestPermission().then(permissionResult => {
      if (permissionResult === 'granted') {
        console.log('Can show');
      }
    })

    this.swPush.messages.subscribe(console.log);

    // this.swPush.requestSubscription();
  }
}
