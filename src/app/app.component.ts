import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MRBS_Web';
  

  isMenuVisible = true;
  constructor(private router: Router) {

    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) { // Only update the menu visibility after navigation is complete

        const currentRoute = this.router.url;

        console.log(currentRoute);

        if (currentRoute === '/login') {

          this.isMenuVisible = false;

        } else {

          this.isMenuVisible = true;

        }

      }

    });

  }
  logOut(){
    
    this.router.navigate(['/login']);
  }

}
  

