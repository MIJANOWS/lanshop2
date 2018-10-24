import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  
  cart: Observable<ShoppingCart>;
  
  cartSubscription: Subscription;
  

  constructor(
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(){
    this.cart = await this.shoppingCartService.getCart();
   
  }

}
