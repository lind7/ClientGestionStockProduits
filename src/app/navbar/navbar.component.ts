import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {ProduitService} from '../produit/produit.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  produit: Observable<any>;
  motCle: String= '';
  page=  0;
  size = 0;
@Input()
showHideSidebar: boolean;
@Output()
showHideSidebarChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private produitService: ProduitService) { }

  ngOnInit() {
  }
  afficherSidebar() {
    this.showHideSidebar = !this.showHideSidebar;
    this.showHideSidebarChange.emit(this.showHideSidebar);
  }
  doSearch() {
    this.produitService.getProduitsMotcle(this.motCle, this.size, this.page)
      .map(resp => resp.json())
      .subscribe(
      data => {this.produit = data; },
      error => {console.log('an error was occured'); },
      () => { console.log('loading products was done'); }
    );
  }
  chercher() {
    this.doSearch();
  }
}
