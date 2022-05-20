import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'titus-assessment';
  productList: any = [
    { id: 0, name: "Product 1", piece: 20, bulk: 0, promoNeed: 1, promoAdd: 1 },
    { id: 1, name: "Product 2", piece: 0, bulk: 20, promoNeed: 2, promoAdd: 1 },
    { id: 2, name: "Product 3", piece: 0, bulk: 25, promoNeed: 0, promoAdd: 0 },
    { id: 3, name: "Product 4", piece: 35, bulk: 0, promoNeed: 0, promoAdd: 0 },
    { id: 4, name: "Product 5", piece: 40, bulk: 0, promoNeed: 0, promoAdd: 0 }
  ]
  scanedProduct: any = [];
  total: any = 0;
  selectedProduct: any = { id: 0, name: "", piece: 0, bulk: 0, promoNeed: 0, promoAdd: 0 };
  qty: any = 0;
  showPrint: any = false;
  
  selectProduct(item) {
    this.selectedProduct = item;
    this.qty = 1;
  }
  scan() {
    let product = this.selectedProduct;
    if (product.name != "") {
      let price = (product.piece != 0) ? product.piece : product.bulk;
      let item = {
        id: product.id,
        name: product.name,
        price: price,
        qty: this.qty,
        total: price * this.qty,
        promoAdded: 0,
        promo: (product.promoNeed != 0) ? "buy " + product.promoNeed + " get " + product.promoAdd : ""
      };
      this.total += item.total;
      this.addToList(item);
    } else {
      alert("No product selected");
    }
  }
  addToList(item) {
    if (this.scanedProduct.length != 0) {
      let dublicate = this.scanedProduct.filter(data => {
        if (data.id == item.id) {
          data.qty += item.qty;
          data.total += item.total;
        }
        return data.id == item.id;
      });
      if (dublicate.length == 0) {
        this.scanedProduct.push(item)
      }
    } else {
      this.scanedProduct.push(item)
    }
    if (this.selectedProduct.promoNeed != 0) {
      this.computePromo();
    }
  }
  computePromo() {
    this.scanedProduct.filter(data => {
      if (data.id == this.selectedProduct.id) {
        let promoCount: any = (data.qty / this.selectedProduct.promoNeed) + "";
        data.promoAdded = parseInt(promoCount.split(".")[0]) * this.selectedProduct.promoAdd;
      }
    })
  }
  clear() {
    this.showPrint = false;
    this.scanedProduct = [];
    this.selectedProduct = { id: 0, name: "", piece: 0, bulk: 0, promoNeed: 0, promoAdd: 0 };
    this.total = 0;
    this.qty = 0;
  }
  print() {
    if (this.scanedProduct.length != 0) {
      this.showPrint = (this.showPrint) ? false : true
    } else {
      alert("No product scanned")
    }

  }
}
