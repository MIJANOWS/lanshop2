import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories$;
  categoriesRef;

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
   // return this.db.list('/categories').valueChanges();
    this.categoriesRef = this.db.list('/categories/');
    return this.categories$ = this.categoriesRef.snapshotChanges().map(changes=>{
      return changes.map(c =>({
        key:c.payload.key, ...c.payload.val()
      }));
    });
  }
}
