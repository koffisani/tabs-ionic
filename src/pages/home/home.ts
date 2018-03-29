import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';
import { FilterModalPage } from '../filter-modal/filter-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public products = [];
  public femaleSelected = true;
  public maleSelected = true;

  constructor(private product: ProductProvider,
    private modalController: ModalController, 
    public navCtrl: NavController) {

  }

  ionViewDidLoad () {
    this.product.getProducts()
    .subscribe((response: any) => {
      console.log(response)
      this.products = response;
    })
  }

  gotToPoductDetailPage(produit) {
    this.navCtrl.push(ProductDetailPage, {
      productDetails: produit
    })
  }

  openFilterModal () {
    let filterStateFromMainPage = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };
    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromMainPage);
    openFilterModal.onDidDismiss((filterState) => {
      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;
      
      this.product.getProducts()
      .subscribe((allProducts: any) => {
        let products = allProducts;
        if (filterState.maleSelected && filterState.femaleSelected) {
          this.products = products;
          return;
        } else if (!filterState.maleSelected && !filterState.femaleSelected) {
          this.products = [];
          return;
        } else if (filterState.femaleSelected && !filterState.maleSelected) {
          this.products = products.filter((product) => {
            return product.gender !== "male";
          });
        } else if (!filterState.femaleSelected && filterState.maleSelected) {
          this.products = products.filter((product) => {
            return product.gender !== "female";
          });
        }
      })
    });
    openFilterModal.present();
  }

}
