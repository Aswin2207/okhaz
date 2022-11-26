import { Routes } from '@angular/router';
import { CategoriesSupplierComponent } from './categories-supplier/categories-supplier.component';
import { AddProductDetailsComponent } from './add-product-details/add-product-details.component';
import { AddProductComponent } from './addproduct/addproduct.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ViewComponent } from './view/view.component';

import { ExportProductComponent } from './export-product/export-product.component';
import { ImportProductComponent } from './import-product/import-product.component';
import { ProductVariantsComponent } from './product-variants/product-variants.component';
import { ProductReviewComponent } from './product-review/product-review.component';

export const productRouters: Routes = [
    {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: "view",
                component: ViewComponent,
            },
            {
                path: "quick-add",
                component: AddProductComponent
            },
            {
                path: "detailed-add",
                component: AddProductDetailsComponent
            },
            {
                path: "product-categories",
                component: ProductCategoriesComponent,
            },
            {
                path: "categories-supplier",
                component: CategoriesSupplierComponent
            },
            {
                path: "brands",
                component: BrandsComponent
            }
        ]
    }
]