import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileUploadModule } from 'ng2-file-upload';

import { WheelGameComponent } from './wheel-game/wheel-game.component';
import { WheelGameDetailComponent } from './wheel-game-detail/wheel-game-detail.component';
import { ReelComponent } from './reel/reel.component';
import { AddReelComponent } from './reel/add-reel/add-reel.component';
import { CouponcodeComponent } from './couponcode/couponcode.component';
import { BannersComponent } from './banners/banners.component';
import { ProductCategoriesComponent } from '../products/product-categories/product-categories.component';
import { markettingRouters } from './marketting.routing';
import { WidgetComponentModule } from '../widget-component/widget-component.module';

@NgModule({
    declarations: [
        WheelGameComponent,
        WheelGameDetailComponent,
        CouponcodeComponent,
        ProductCategoriesComponent,
        BannersComponent,
        ReelComponent,
        AddReelComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(markettingRouters),
        WidgetComponentModule,
        MatGridListModule,
        MatIconModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        TranslateModule,
        MatProgressBarModule,
        MatPaginatorModule,
        FlexLayoutModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDividerModule,
        FormsModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatChipsModule,
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
        FileUploadModule,
        ColorPickerModule,
        MatCardModule
    ]
})
export class MarkettingModule { }
