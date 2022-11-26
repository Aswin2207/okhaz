import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TextMaskModule } from "angular2-text-mask";
import { NgAisModule } from "angular-instantsearch";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

import { ShopComponent } from "./shop/shop.component";
import { CardComponent } from "./cards/cards.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { WidgetComponentModule } from "../widget-component/widget-component.module";
import { InvoiceComponent } from "./invoice/invoice.component";
import { EcommerceRoutes } from "./ecommerce.routing";
import { ProductsComponent } from "./products/products.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditProductsComponent } from "./edit-products/edit-products.component";

@NgModule({
  declarations: [
    ShopComponent,
    CardComponent,
    CartComponent,
    CheckoutComponent,
    InvoiceComponent,
    ProductsComponent,
    EditProductComponent,
    AddProductComponent,
    EditProductsComponent,
  ],
  imports: [
    CommonModule,
    NgAisModule.forRoot(),
    RouterModule.forChild(EcommerceRoutes),
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    TextMaskModule,
    MatDividerModule,
    WidgetComponentModule,
    TranslateModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class EcommerceModule {}
