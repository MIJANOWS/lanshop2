import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html', 
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  shipping:any;
  userId: string; 
  userSubscription: Subscription;
  orderId: string;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService, 
    private orderService: OrderService,
    private authService: AuthService) { 
      this.shipping={};
    }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user=> this.userId = user.uid);
    
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart, "");
    let result = this.orderService.placeOrder(order);
    this.orderService.updateOrder(result.key, new Order(this.userId, this.shipping, this.cart, result.key))
    this.shoppingCartService.clearCart();
    this.router.navigate(['/order-success', result.key]);
  }

}
