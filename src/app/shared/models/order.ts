import { ShoppingCart } from './shopping-cart';

export class Order{
    datePlaced: number;
    items: any[];
    id:string;

    constructor(public userId: string, public shipping: any, public shoppingCart: ShoppingCart, public orderId:string){
        this.datePlaced = new Date().getTime();

       this.items = shoppingCart.items.map(i=>{
            return{
              product:{
                title: i.product.title,
               // imageUrl: i.product.imageUrl,
                price: i.product.price
              },
              quntity: i.quantity,
              totalPrice: i.totalPrice
              
            }
        })
      
    }
}