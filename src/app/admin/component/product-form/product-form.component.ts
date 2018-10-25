import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:any;
  id;


  constructor(
    private categoriesService: CategoryService,
    private route:ActivatedRoute, 
    private productService: ProductService,
    private router: Router) {
      this.product={};
    this.categories$ = categoriesService.getCategories(); 
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getProduct(this.id).take(1).subscribe(p=>this.product =p.payload.val());
   }

   save(product){
    if(this.id) this.productService.update(this.id,product);
    else this.productService.create(product);

     this.router.navigate(['/admin/products']);
   }

   delete(){
     if(confirm('Czy na pewno chcesz usunać produkt?')){
       this.productService.delete(this.id);

       this.router.navigate(['/admin/products']);
     }
   }

  ngOnInit() {
  }

}
