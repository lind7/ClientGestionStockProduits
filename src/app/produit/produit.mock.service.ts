import {Injectable} from '@angular/core';
import {Produit} from '../share/produit';
@Injectable()
export class ProduitMockService {
   private PRODUITS: Produit[]= [];
   constructor() {
     const p1: Produit = new Produit('livre', 50, 20);
     const p2: Produit = new Produit('cahier', 54, 200);
     const p3: Produit = new Produit('stylo', 58, 300);

     this.PRODUITS.push(p1);
     this.PRODUITS.push(p2);
     this.PRODUITS.push(p3);
   }
   public getProduits(): Produit[] {
     return this.PRODUITS;

   }
}
