import { Component, OnInit } from '@angular/core';
import {ProduitService} from './produit.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';
import {Produit} from '../share/produit';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
produits: Observable<any>;
produitForm: FormGroup;
operation: String = ' ';
selectedProduit: Produit;
  constructor(private produitService: ProduitService, private fb: FormBuilder, private route: ActivatedRoute) {
  this.createForm();
  }

  ngOnInit() {
    this.initProduit();
    this.loadProduit();
  }
  createForm() {
  this.produitForm = this.fb.group({
    ref: ['', Validators.required],
    quantite: [''],
    prixUnitaire: ['']
  });
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
        res => {  this.initProduit(); this.loadProduit(); },
        error => {console.log('an error was occured when adding'); },
        () => { console.log('adding products was done'); console.log(p); }
      );
    this.loadProduit();
  }

  updateProduit() {
    this.produitService.updateProduit(this.selectedProduit)
      .subscribe(
        res => {  this.initProduit(); this.loadProduit(); },
        error => {console.log('an error was occured when adding'); },
        () => { console.log('updating products was done');  }
      );
    this.loadProduit();
  }
  deleteProduit() {
    this.produitService.deleteProduit(this.selectedProduit.ref)
      .subscribe(
        res => {
          this.selectedProduit = new Produit();
          this.loadProduit();
        }
      );
    this.loadProduit();
  }
initProduit() {
    this.selectedProduit = new Produit();
     this.createForm();
}

}
