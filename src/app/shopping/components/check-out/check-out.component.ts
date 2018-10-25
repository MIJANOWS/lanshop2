import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

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
