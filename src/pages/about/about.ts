import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public bestSellerProducts = [];

  constructor(private productProvider: ProductProvider, 
    public navCtrl: NavController) {

  }

  ionViewDidLoad () {
    this.productProvider.getProducts()
    .subscribe((allProducts) => {
      this.bestSellerProducts = allProducts.filter(product => product.bestSeller == true);
      console.log(this.bestSellerProducts);
    })
  }

  gotToPoductDetailPage(product) {
    this.navCtrl.push(ProductDetailPage, {
      productDetails: product
    })
  }

}
