import { Component, OnInit } from "@angular/core";
import { SalesService } from "../../../services/sales.service";
import { AlertService } from "../../../layout/components/services/alert.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { ISales } from "../../../interfaces/sales/sales.interface";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../../Product/product.url";
import { ProductService } from "../../../services/product.service";
import { PrintBill } from "src/app/services/print.service";
import { SalesUrl } from "../../sales.url";

@Component({
  selector: "app-detail-bill",
  templateUrl: "./detail-bill.component.html",
  styleUrls: ["./detail-bill.component.css"]
})
export class DetailBillComponent {
  constructor(
    private productService: ProductService,
    private salesService: SalesService,
    private alert: AlertService,
    private router: Router,
    private accessTokenService: AccessTokenService,
    private nativeRoute: ActivatedRoute,
    private printService: PrintBill
  ) {
    this.nativeRoute.params.forEach(query => {
      this.salesBillId = query.id;
    });
    this.onInitailLoadSalesBill();
  }

  AppUrl = AppUrl;
  ProductUrl = ProductUrl;
  SalesUrl = SalesUrl;
  
  productName: string;
  salesBillId: string;
  salesBill: ISales;

  onInitailLoadSalesBill() {
    this.salesService
      .onGetSalesBillProductById(
        this.salesBillId,
        this.accessTokenService.getAccesstokenStore()
      )
      .then(salesBill => {
        console.log(salesBill);
        this.salesBill = salesBill;
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  onGetStatsuSalesString(status: string) {
    if (status == "true") {
      return "ลงระบบ"
    } else {
      return "ยกเลิกใบเสร็จ";
    }
  }

  print() {
    this.printService.onPrint();
  }
}
