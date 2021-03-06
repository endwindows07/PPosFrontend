import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../../../layout/components/services/alert.service";
import { AccessTokenService } from "../../../services/accesstoken.service";
import { IProduct } from "../../../interfaces/Product/product.interface";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TypeProduct } from "../../../interfaces/Product/product-type.interface";
import { ICategory } from "../../../interfaces/Product/product-category.interface";
import { IOptionKey } from "../../../interfaces/search-key.interface";
import { AppUrl } from "../../../app.url";
import { ProductUrl } from "../../product.url";
import { ImageService } from "src/app/services/image.service";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.css"]
})
export class UpdateProductComponent {
  constructor(
    private productService: ProductService,
    private router: Router,
    private alert: AlertService,
    private accessTokenService: AccessTokenService,
    private builder: FormBuilder,
    private nativeRoute: ActivatedRoute,
    private imageService: ImageService
  ) {
    this.nativeRoute.params.forEach(query => {
      this.ProductId = query.id;
    });
    this.typeSelected = this.typeItem[0];
    this.categorySelected = this.categoryItem[0];
    this.initailLoadFormCreateProduct();
    this.onLoadProduct(this.ProductId);
  }

  form: FormGroup;
  ProductId: number;
  Product: IProduct;
  statusProduct: boolean;
  expired: string[];

  type = TypeProduct;
  typeSelected: IOptionKey;
  typeItem: IOptionKey[] = [
    { key: this.type.อัน.toString(), value: "อัน" },
    { key: this.type.ขวด.toString(), value: "ขวด" },
    { key: this.type.ชิ้น.toString(), value: "ชิ้น" },
    { key: this.type.ด้าม.toString(), value: "ด้าม" },
    { key: this.type.เล่ม.toString(), value: "เล่ม" },
    { key: this.type.ห่อ.toString(), value: "ห่อ" },
    { key: this.type.เครื่อง.toString(), value: "เครื่อง" },
    { key: this.type.แท่ง.toString(), value: "แท่ง" },
    { key: this.type.ลูก.toString(), value: "ลูก" },
    { key: this.type.แผ่น.toString(), value: "แผ่น" },
    { key: this.type.เส้น.toString(), value: "เส้น" }
  ];

  category = ICategory;
  categorySelected: IOptionKey;
  categoryItem: IOptionKey[] = [
    { key: this.category.ของใช้ทั่วไป.toString(), value: "ของใช้ทั่วไป" },
    { key: this.category.ขนม.toString(), value: "ขนม" },
    { key: this.category.อาหารสำเร็จรูป.toString(), value: "อาหารสำเร็จรูป" },
    { key: this.category.เครื่องดื่ม.toString(), value: "เครื่องดื่ม" },
    { key: this.category.เครื่องครัว.toString(), value: "เครื่องครัว" },
    { key: this.category.เครื่องสำอาง.toString(), value: "เครื่องสำอาง" },
    { key: this.category.อุปกรณ์ห้องน้ำ.toString(), value: "อุปกรณ์ห้องน้ำ" },
    { key: this.category.เครื่องเขียน.toString(), value: "เครื่องเขียน" },
    { key: this.category.เครื่องมือ.toString(), value: "เครื่องมือ" },
    { key: this.category.เครื่อใช้ไฟฟ้า.toString(), value: "เครื่อใช้ไฟฟ้า" },
    { key: this.category.ยา.toString(), value: "ยา" },
    { key: this.category.ของเล่นเด็ก.toString(), value: "ของเล่นเด็ก" },
    { key: this.category.ไม่มีหมวดหมู่.toString(), value: "ไม่มีหมวดหมู่" }
  ];

  onLoadProduct(id: number) {
    this.productService
      .onGetProductById(id, this.accessTokenService.getAccesstokenStore())
      .then(product => {
        this.Product = product;
        this.typeSelected = this.typeItem[product.type - 1];
        this.categorySelected = this.categoryItem[parseInt(product.productCategoryId) - 1];

        this.expired = product.expired.split("T");
        this.expired = this.expired[0].split("-");

        this.form.controls["expired"].setValue(
          this.expired[1] + "/" + this.expired[2] + "/" + this.expired[0]
        );
        
        this.statusProduct = product.status;
        this.form.controls["name"].setValue(product.name);
        this.form.controls["barcode"].setValue(product.barcode);
        // this.form.controls["barcode_Custom"].setValue(product.barcode_Custom);
        this.form.controls["description"].setValue(product.description);
        this.form.controls["cost_Product"].setValue(product.cost_Product);
        this.form.controls["price"].setValue(product.price);
        this.form.controls["amount_Product"].setValue(product.amount_Product);
        this.form.controls["type"].setValue(this.typeSelected.key);
        this.form.controls["image_Url"].setValue(product.image);
        this.form.controls["productCategoryId"].setValue(
          this.categorySelected.key
        );
        this.changeStatusProduct();
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(["", AppUrl.Product, ProductUrl.Products]);
      });
  }

  onUpdateProduct() {
    this.onSetValueProductOther();
    if(this.form.invalid){
      return this.alert.error_alert("กรุณากรอกข้อมูล");
    }
    this.productService
      .onUpdateProduct(this.form.value, this.ProductId, this.accessTokenService.getAccesstokenStore())
      .then(res => {
        this.alert.success_alert("update product success");
        this.router.navigate(["/", AppUrl.Product, ProductUrl.Products]);
      })
      .catch(err => {
        this.alert.error_alert(err.Message);
        this.router.navigate(["/", AppUrl.Product, ProductUrl.Products]);
      });
  }

  onSetValueProductOther() {
    this.form.controls["type"].setValue(this.typeSelected.key);
    this.form.controls["productCategoryId"].setValue(this.categorySelected.key);
    this.form.controls["status"].setValue(this.statusProduct);
  }

  initailLoadFormCreateProduct() {
    this.form = this.builder.group({
      barcode: ["", [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      // barcode_Custom: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ["", [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
      image_Url: [],
      image: [],
      status: [],
      expired: [""],
      cost_Product: ["", [Validators.required]],
      price: ["", [Validators.required]],
      amount_Product: ["", [Validators.required]],
      type: [""],
      productCategoryId: [""]
    });
  }

  onCovertImage(input: HTMLInputElement) {
    const imageControl = this.form.controls['image_Url'];
    this.imageService
      .onConvertImage(input)
      .then(base64 => {
        imageControl.setValue(base64);
      })
      .catch(err => this.alert.error_alert(err.Message));
  }

  changeStatusProduct(){
    
    console.log(this.statusProduct);
    if(this.statusProduct == true){
      document.getElementById('changeStatusProduct').className = "btn btn-md btn-secondary btn-toggle active";
    }else{
      document.getElementById('changeStatusProduct').className = "btn btn-md btn-secondary btn-toggle unactive";    
    }
    this.statusProduct = !this.statusProduct; 
  }
  
}
