import { Routes } from '@angular/router';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ExportOrdersComponent } from './export-orders/export-orders.component';
import { DraftOrdersComponent } from './draft-orders/draft-orders.component';
import { TrackingNumbersComponent } from './tracking-numbers/tracking-numbers.component';
import { GiftCertificatesComponent } from './gift-certificates/gift-certificates.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { OrderReportComponent } from './order-report/order-report.component';

export const orderRouters: Routes = [
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
				component: ViewOrdersComponent,
				children: [
					{
						path: 'detail',
						component: OrderDetailComponent
					}
				]
			},
			{
				path: "add",
				component: AddOrderComponent
			},
			{
				path: "export",
				component: ExportOrdersComponent
			},
			{
				path: "draft-orders",
				component: DraftOrdersComponent
			},
			{
				path: "order-status",
				component: OrderStatusComponent
			},
			{
				path: "customer-review",
				component: CustomerReviewComponent
      },
      {
        path: "order-sales-report",
        component: OrderReportComponent
      }
		]
	}
]
