import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { StorefrontComponent } from './storefront/storefront.component';
import { MarkettingComponent } from './marketting/marketting.component';
import { StoresetupComponent } from './storesetup/storesetup.component';
import { AdvSettingsComponent } from './adv-settings/adv-settings.component';
import { AccSettingsComponent } from './acc-settings/acc-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductsModule } from './products/products.module';
import { ProductsComponent } from './products/products.component';
import { OrdersModule } from './orders/orders.module';
import { MarkettingModule } from './marketting/marketting.module';
import { UsersModule } from './users/users.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatRadioModule } from '@angular/material/radio';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BarRatingModule } from "ngx-bar-rating";
import { MatStepperModule } from '@angular/material/stepper';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

@NgModule({
  declarations: [HomeComponent, UsersComponent,  
    CustomersComponent, StorefrontComponent, MarkettingComponent, StoresetupComponent,
     AdvSettingsComponent, AccSettingsComponent, ProfileComponent, DashboardComponent,
     ProductsComponent,OrdersComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    SharedModule,
    MatMenuModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatBadgeModule,
    MatFormFieldModule,
    MatSidenavModule, 
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    MarkettingModule,
    MatButtonModule, 
    MatStepperModule,
    MatInputModule, 
    PerfectScrollbarModule,
    MatRadioModule,
    NgbModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    ChartsModule,
    BarRatingModule,
    NgxEchartsModule.forRoot({
			echarts,
		}),
  //  MatDatepickerModule, 
  //  MatNativeDateModule, 
  //  MatProgressSpinnerModule,
  //  MatExpansionModule, 
  //   MatSnackBarModule, 
  //   MatTooltipModule, 
  //   MatTabsModule, 
  //   MatProgressBarModule,
  //   MatSliderModule,
  //   MatRadioModule,
  //   MatDialogModule,
  ]
})
export class HomeModule { }
