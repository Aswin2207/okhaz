import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { CardModule } from 'ngx-card';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { CoursesRoutes } from './courses.routing';
import { PaymentComponent } from './payment/payment.component';
import { SigninComponent } from './signin/signin.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CourseListComponent } from './course-list/course-list.component';
import { WidgetComponentModule } from '../widget-component/widget-component.module';

@NgModule({
	declarations: [
		CoursesDetailComponent,
		CourseListComponent,
		PaymentComponent,
		SigninComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule.forChild(CoursesRoutes),
		FlexLayoutModule,
		MatCardModule,
		CardModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		MatGridListModule,
		MatListModule,
		MatMenuModule,
		MatPaginatorModule,
		MatTabsModule,
		MatChipsModule,
		MatFormFieldModule,
		MatExpansionModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      MatCheckboxModule,
      BarRatingModule,
    	TranslateModule,
    	WidgetComponentModule
	]
})
export class CoursesModule { }
