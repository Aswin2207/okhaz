import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { cryptoRouters } from './crypto.routing';
import { MarketcapComponent } from './marketcap/marketcap.component';
import { WalletComponent } from './wallet/wallet.component';
import { TradeComponent } from './trade/trade.component';

@NgModule({
	declarations: [MarketcapComponent, WalletComponent, TradeComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(cryptoRouters),
		MatIconModule,
		MatButtonModule,
		MatTabsModule,
		MatCardModule,
		MatTableModule,
		MatMenuModule,
		MatListModule,
		ChartsModule,
		MatSortModule,
		MatCheckboxModule,
		MatDividerModule,
		MatProgressBarModule,
		MatInputModule,
		MatFormFieldModule,
		PerfectScrollbarModule,
		MatExpansionModule,
		NgxDatatableModule,
		FlexLayoutModule,
		MatOptionModule,
		MatSelectModule,
		WidgetComponentModule,
		SlickCarouselModule,
		MatPaginatorModule,
		TranslateModule
	]
})
export class CryptoModule { }
