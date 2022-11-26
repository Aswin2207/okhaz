import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { BarRatingModule } from "ngx-bar-rating";

import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SupplierDetailComponent } from './supplier-list/supplier-detail/supplier-detail.component';
import { CustomerDetailComponent } from './customer-list/customer-detail/customer-detail.component';
import { EmployeeDetailComponent } from './employee-list/employee-detail/employee-detail.component';

import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { UserRoutes } from './users.routing';

@NgModule({
declarations: 
	[
		SupplierListComponent,
        CustomerListComponent,
        EmployeeListComponent,
        SupplierDetailComponent,
        CustomerDetailComponent,
        EmployeeDetailComponent
   ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule.forChild(UserRoutes),
		PerfectScrollbarModule,
		FileUploadModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatExpansionModule,
		MatDatepickerModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		MatPaginatorModule,
		MatDividerModule,
		MatCheckboxModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatTableModule,
		ColorPickerModule,
		FormsModule,
		MatTabsModule,
		MatChipsModule,
		MatSelectModule,
		WidgetComponentModule,
		BarRatingModule,
		TranslateModule
	]
})
export class UsersModule { }
