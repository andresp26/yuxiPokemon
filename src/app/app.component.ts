import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'pokedex';

  watcherRoute: Subscription;
  isActiveMenu = false;

  constructor(private router: Router) {
    this.subscriberRoute();
   }

  subscriberRoute() {
    this.watcherRoute = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url != '/') {
          this.isActiveMenu = true;
        }
        else { this.isActiveMenu = false; }
      }
    })
  }


  ngOnDestroy(): void {
    this.watcherRoute.unsubscribe();
  }
}
