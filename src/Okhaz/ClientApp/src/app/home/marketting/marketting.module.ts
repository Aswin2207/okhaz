import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelGameComponent } from './wheel-game/wheel-game.component';
import { WheelGameDetailComponent } from './wheel-game-detail/wheel-game-detail.component';
import { CouponcodeComponent } from './couponcode/couponcode.component';
import { BannersComponent } from './banners/banners.component';
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
import { ColorPickerModule } from 'ngx-color-picker';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        WheelGameComponent,
        WheelGameDetailComponent,
        CouponcodeComponent,
        BannersComponent],
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
        MatCardModule
    ]
})
export class MarkettingModule { }
