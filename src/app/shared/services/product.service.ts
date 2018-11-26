import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productRef;
  product$;

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
    
  }

  getAll(){

    this.productRef = this.db.list('/products/');
    return this.product$ = this.productRef.snapshotChanges().map(changes =>{ 
      return changes.map(c=>({
        key: c.payload.key, ...c.payload.val()
      }));
    });

  }

  getProduct(productId){ 
    return this.db.object('/products/'+productId).snapshotChanges();
  }

  update(productId, product){
   return this.db.object('/products/'+productId).update(product); 
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
}
