import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showHideSidebar =  false;
  onShowsidebarChange(showHideSidebar) {
    this.showHideSidebar = showHideSidebar;
    this.showHideSidebar = this.showHideSidebar;

  }
}
