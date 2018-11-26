import { OrderService } from '../../../shared/services/order.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'my-order-id',
  templateUrl: './my-order-id.component.html',
  styleUrls: ['./my-order-id.component.css']
})
export class MyOrderIdComponent {

  order = {};
  id: string;

  constructor(private orderService:OrderService, private route:ActivatedRoute) { 
    this.order = {};
    this.id = this.route.snapshot.paramMap.get('id');
    
  }

   //ngOnInit() {
    //this.order =  await this.orderService.getOrder(this.id).subscribe(p=>this.order =p.payload.val());
    //this.orderService.getOrder(this.id).
  //}

}
