import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '../../../../node_modules/angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/operator/take';
import { pipe, Observable } from '../../../../node_modules/rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>>{
    const cartId= await this.getOrCreateCartId();
     const cart = this.db.object('/shopping-carts/'+cartId).snapshotChanges().pipe(
      map((action:any) => {
       
        const key = action.key;
        if(action.payload.val() ===null){
          const items = {};
          return new ShoppingCart(key, items);
        }else{
          const items = action.payload.val().items;
          return new ShoppingCart(key, items);
        }

      })
    );
    return cart;
    
  }


  async addToCart(product: Product){
    this.updateItem(product, +1)
  }

  async removeFromCart(product: Product){
    this.updateItem(product,-1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId + '/items').remove();
    
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId:string,productId:string){
    return this.db.object('/shopping-carts/'+cartId + '/items/'+productId);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
   
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe(item =>{
      let quantity = item?item['quantity'] +change :1;
      if(quantity===0) item$.remove();
      else item$.update({
        product: product, 
        //title: product.title,
       // imageUrl: product.imageUrl,
        //price: product.price,
        quantity: quantity
      });
    });
  }
  
}
