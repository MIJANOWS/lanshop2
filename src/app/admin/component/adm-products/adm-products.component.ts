import { Product } from '../../../shared/models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from '../../../../../node_modules/rxjs';
import { Data } from '../../../../../node_modules/@angular/router';



@Component({
  selector: 'app-adm-products',
  templateUrl: './adm-products.component.html',
  styleUrls: ['./adm-products.component.css']
})
export class AdmProductsComponent implements OnInit, OnDestroy{
  
  products: Product[];
  subscription: Subscription;
  filteredProducts: any[];
  items:Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products =>{
       this.filteredProducts = this.products = products;
    });
  }


  filter(query: string){
    this.filteredProducts = (query)? this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())):
    this.products;
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
