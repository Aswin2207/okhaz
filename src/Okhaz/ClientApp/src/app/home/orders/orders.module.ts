import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ExportOrdersComponent } from './export-orders/export-orders.component';
import { DraftOrdersComponent } from './draft-orders/draft-orders.component';
import { TrackingNumbersComponent } from './tracking-numbers/tracking-numbers.component';
import { GiftCertificatesComponent } from './gift-certificates/gift-certificates.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

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
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    ViewOrdersComponent,
    AddOrderComponent,
    ExportOrdersComponent,
    DraftOrdersComponent,
    TrackingNumbersComponent,
    GiftCertificatesComponent,
    OrderStatusComponent,
    OrderDetailComponent,
    EditOrderComponent,
    OrderReportComponent
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
    MatCardModule,
    MatStepperModule
  ]
})
export class OrdersModule { }
