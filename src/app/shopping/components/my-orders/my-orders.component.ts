import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html', 
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent{
  orders;
  filteredOrders: any[];
  subscription: Subscription; 

  constructor(private authService:AuthService, private orderService: OrderService) {
    this.subscription =  this.orders = authService.user$.switchMap((u => orderService.getOrdersByUser(u.uid)))
    .subscribe(orders =>{
      this.filteredOrders = this.orders = orders;
    })
    
   //this.subscription = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid)).subscribe(orders =>{
    //  this.filteredOrders = this.orders = orders;
   // })
  }

   filter(query: string){
    this.filteredOrders = (query)? this.orders.filter(p=> p.shipping.name.toLowerCase().includes(query.toLowerCase())):
    this.orders;
    
  }
}
