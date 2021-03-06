import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  productRef;
  order$

  constructor(private db:AngularFireDatabase, private shoppingCartService:ShoppingCartService) { }

  placeOrder(order){
    return this.db.list('/orders').push(order);
  }

  getOrdersByUser(userId:string){
    return this.db.list('/orders', ref=> ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

  delateOrder(odrerId){
    return this.db.object('/orders/'+odrerId).remove();
  }

  getOrders(){

    this.productRef = this.db.list('/orders/');
    return this.order$ = this.productRef.snapshotChanges().map(changes =>{ 
      return changes.map(c=>({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  updateOrder(orderId, order){
    return this.db.object('/orders/'+orderId).update(order); 
  }

  async getOrder(orderId){
   // this.productRef = this.db.list('/orders/'+orderId);
   // return this.order$ = this.productRef.snapshotChanges().map(changes =>{ 
   //   return changes.map(c=>({
    //    key: c.payload.key, ...c.payload.val()
    //  }));
    //});

    return  this.db.object('/orders/'+orderId).snapshotChanges();
  }


}
