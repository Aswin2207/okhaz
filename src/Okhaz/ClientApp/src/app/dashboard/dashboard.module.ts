import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { NgxEasypiechartModule } from 'ngx-easypiechart';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { BarRatingModule } from "ngx-bar-rating";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SaasComponent } from './saas/saas.component';
import { WebAnalyticsComponent } from './web-analytics/webanalytics.component';
import { DashboardRoutes } from './dashboard.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { CryptoComponent } from './crypto/crypto.component';
import { CrmComponent } from './crm/crm.component';
import { CoursesComponent } from './courses/courses.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
	declarations: [
		SaasComponent,
		WebAnalyticsComponent,
		CryptoComponent,
		CrmComponent,
		CoursesComponent,
		DashboardComponent
	],
	imports: [
		CommonModule,
		MatTableModule,
		MatSelectModule,
		FlexLayoutModule,
		WidgetComponentModule,
		NgxEasypiechartModule,
		MatPaginatorModule,
		MatChipsModule,
		TranslateModule,
		PerfectScrollbarModule,
		RouterModule.forChild(DashboardRoutes),
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatCardModule,
		MatMenuModule,
		MatListModule,
		MatCheckboxModule,
		MatDividerModule,
		MatStepperModule,
		ChartsModule,
		NgxDatatableModule,
		MatProgressBarModule,
		MatSlideToggleModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		ReactiveFormsModule,
		MatSortModule,
		BarRatingModule,
		AgmCoreModule.forRoot({ apiKey: 'AIzaSyD4y2luRxfM8Q8yKHSLdOOdNpkiilVhD9k' }),
		NgxEchartsModule.forRoot({ echarts }),
	],
	schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
