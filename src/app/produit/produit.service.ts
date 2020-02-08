import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {API_URLS} from '../config/api.url.config';
import {Produit} from '../share/produit';

@Injectable()
export class ProduitService {
  public constructor (private http: Http) {
  }
  getProduits(): Observable<any> {
    return this.http.get(API_URLS.PRODUITS_URL);
}
  getProduitsMotcle(motCle: String, page: number, size: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/produit?mc=' + motCle + '&page =' + page + ' &size = ' + size);
  }
  addProduit(produit: Produit): Observable<any> {
     return this.http.post(API_URLS.PRODUITS_URL, produit);
  }

  updateProduit(produit: Produit): Observable<any> {
    return this.http.put(API_URLS.PRODUITS_URL, produit);
  }
  deleteProduite(ref: String): Observable<any> {
    return this.http.delete(API_URLS.PRODUITS_URL + `/${ref}`);
  }
}

