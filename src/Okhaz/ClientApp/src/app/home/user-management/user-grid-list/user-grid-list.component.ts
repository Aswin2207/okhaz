import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ms-user-grid-list',
  templateUrl: './user-grid-list.component.html',
  styleUrls: ['./user-grid-list.component.scss']
})
export class UserGridListComponent implements OnInit {
 
	userGridList : any;

	constructor() { }

	ngOnInit() {
	
	}

}
