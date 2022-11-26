import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SupplierDetailComponent } from './supplier-list/supplier-detail/supplier-detail.component';
import { CustomerDetailComponent } from './customer-list/customer-detail/customer-detail.component';
import { EmployeeDetailComponent } from './employee-list/employee-detail/employee-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
    declarations: [
        SupplierListComponent,
        CustomerListComponent,
        EmployeeListComponent,
        SupplierDetailComponent,
        CustomerDetailComponent,
        EmployeeDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MatGridListModule,
        MatIconModule,
        FlexLayoutModule,
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
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        MatTableModule,
        MatSlideToggleModule,
        MatSliderModule,
        ColorPickerModule,
        MatCardModule,
        MatListModule,
        MatDatepickerModule,
        FileUploadModule,
        BarRatingModule
    ]
})
export class UsersModule { }
