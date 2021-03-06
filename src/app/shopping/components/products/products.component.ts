import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Product } from '../../../shared/models/product';
//import 'rxjs/add/operator/switchMap';
import { switchMap } from '../../../../../node_modules/rxjs-compat/operator/switchMap';
import { Subscription, Observable } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[] = [];
  filteredProducts: Product[] = [];
  category:string;
  cart: any;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(){
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
    //this.cart = await this.shoppingCartService.getCart();
    this.populateProducts();
    
  }

  private populateProducts(){
    this.productService.getAll().switchMap(products => 
      {
      this.products = products;
      return this.route.queryParamMap
      }).subscribe(params=>
        {
        this.category = params.get('category');
        this.applyFilter();
        });
  }

  private applyFilter(){
    this.filteredProducts = (this.category)?
    this.products.filter(p => p.category == this.category): 
    this.products;
  }

}
