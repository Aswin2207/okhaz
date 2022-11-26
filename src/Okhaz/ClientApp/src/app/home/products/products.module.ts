import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './addproduct/addproduct.component';
import { BrandsComponent } from './brands/brands.component';
import { ExportProductComponent } from './export-product/export-product.component';
import { ImportProductComponent } from './import-product/import-product.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { ViewComponent } from './view/view.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { AddProductDetailsComponent } from './add-product-details/add-product-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTreeModule} from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { QuillModule } from 'ngx-quill';
import { CategoriesSupplierComponent } from './categories-supplier/categories-supplier.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ViewComponent,
    AddProductComponent,
    ImportProductComponent,
    ExportProductComponent,
    ProductCategoriesComponent,
    ProductReviewComponent,
    BrandsComponent,
    AddProductDetailsComponent,
    ProductVariantsComponent, CategoriesSupplierComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatGridListModule,
    MatIconModule,
    FlexLayoutModule ,
    MatTabsModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTreeModule,
    MatInputModule,
    PerfectScrollbarModule,
    NgbModule,
    MatSelectModule, 
    MatRadioModule,
    QuillModule.forRoot(),
    MatButtonModule
  ]
})
export class ProductsModule { }
