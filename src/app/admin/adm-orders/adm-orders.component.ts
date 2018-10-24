import { OrderService } from './../../order.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-adm-orders',
  templateUrl: './adm-orders.component.html',
  styleUrls: ['./adm-orders.component.css']
})
export class AdmOrdersComponent {
  @Input('orderId') orderId: string;
  orders:any[];
  filteredOrders: any[];
  subscription: Subscription;
  

  constructor(private orderService: OrderService) { 
    this.subscription = this.orderService.getOrders().subscribe(orders =>{
      this.filteredOrders = this.orders = orders;   
    });
  }

  filter(query: string){
    this.filteredOrders = (query)? this.orders.filter(p=> p.shipping.name.toLowerCase().includes(query.toLowerCase())):
    this.orders;
    
  }

  delete(orderId){
    this.orderService.delateOrder(orderId);
  }
 
}
