import { Component, OnInit } from '@angular/core';
import {ProduitService} from './produit.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
produits: Observable<any>;
produitForm: FormGroup;
  constructor(private produitService: ProduitService, private fb: FormBuilder) {
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      quantite: [''],
      prixUnitaire: ['']
    });
  }

  ngOnInit() {
    console.log('before loadProduit');
    this.loadProduit();
  }
loadProduit() {
    this.produitService.getProduits()
      .map( resp => resp.json())
      .subscribe(
      data => {this.produits = data;  } ,
      error => {console.log('an error was occured'); },
      () => { console.log('loading products was done'); }
      );
}
  addProduit() {
    const p = this.produitForm.value;
    this.produitService.addProduit(p)
      .map( resp => resp.json())
      .subscribe(
      data => {  this.loadProduit(); },
      error => {console.log('an error was occured when adding'); },
      () => { console.log('adding products was done'); console.log(p); }
    );
    this.loadProduit();
  }

}
