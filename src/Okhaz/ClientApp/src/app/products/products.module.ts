import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { productRouters } from './products.routing';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { CategoriesSupplierComponent } from './categories-supplier/categories-supplier.component';
import { AddProductDetailsComponent } from './add-product-details/add-product-details.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { BrandsComponent } from './brands/brands.component';
import { ExportProductComponent } from './export-product/export-product.component';
import { ImportProductComponent } from './import-product/import-product.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { ViewComponent } from './view/view.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ViewComponent,
    AddProductComponent,
    ImportProductComponent,
    ExportProductComponent,
    ProductCategoriesComponent,
    ProductReviewComponent,
    BrandsComponent,
    AddProductDetailsComponent,
    ProductVariantsComponent,
    CategoriesSupplierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRouters),
    WidgetComponentModule,
    MatGridListModule,
    MatIconModule,
    FlexLayoutModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTreeModule,
    MatInputModule,
    PerfectScrollbarModule,
    NgbModule,
    MatSelectModule,
    MatRadioModule,
    QuillModule.forRoot(),
    MatButtonModule,
    FileUploadModule
  ]
})
export class ProductsModule { }
