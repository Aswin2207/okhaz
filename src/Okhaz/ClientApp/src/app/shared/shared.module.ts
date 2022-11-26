import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuToggleModule } from './menu/menu-toggle.module';
import { SharedComponent } from './shared.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TableComponent } from './table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TabsComponent } from './tabs/tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgZoomComponent } from './img-zoom/img-zoom.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';
import { TosterComponent } from './toster/toster.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { MatTreeModule } from '@angular/material/tree';
import { EditorComponent } from './editor/editor.component';
import { WheelComponent } from './wheel/wheel.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [SharedComponent, SidebarComponent, TableComponent, TabsComponent,ImgZoomComponent, InputComponent, SelectComponent, TextareaComponent, TosterComponent, TreeviewComponent, EditorComponent,WheelComponent],
  imports: [
    RouterModule,
	PerfectScrollbarModule,
    CommonModule,
    MenuToggleModule,
    MatCardModule,
    MatButtonModule, 
	MatMenuModule, 
	MatToolbarModule, 
	MatIconModule, 
	MatBadgeModule,
	MatInputModule, 
	MatDatepickerModule, 
	MatNativeDateModule, 
	MatProgressSpinnerModule,
	MatTableModule, 
	MatExpansionModule, 
	MatSelectModule, 
	MatSnackBarModule, 
	MatTooltipModule, 
	MatChipsModule, 
	MatListModule, 
	MatSidenavModule, 
	MatTabsModule, 
	MatProgressBarModule,
	MatCheckboxModule,
	MatSliderModule,
	MatRadioModule,
	MatDialogModule,
	MatGridListModule,
	MatPaginatorModule,
	NgbModule,
	FlexLayoutModule,
	FormsModule,
	MatCheckboxModule,
	MatTreeModule,
    QuillModule.forRoot()
  ]
  ,exports:[
	SidebarComponent,
	TableComponent,
	TabsComponent,
	ImgZoomComponent,
	InputComponent,
	SelectComponent,
	TextareaComponent,
	TosterComponent,
	TreeviewComponent,
	EditorComponent,
	WheelComponent
  ]
})
export class SharedModule { }
