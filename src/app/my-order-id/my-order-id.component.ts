import { OrderService } from './../order.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-order-id',
  templateUrl: './my-order-id.component.html',
  styleUrls: ['./my-order-id.component.css']
})
export class MyOrderIdComponent implements OnInit {

  order: {};
  id: string;

  constructor(private orderService:OrderService, private route:ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.order = await this.orderService.getOrder(this.id);
  }

}
