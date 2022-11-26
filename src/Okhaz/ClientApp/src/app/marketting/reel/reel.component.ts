import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CoreService } from '../../service/core/core.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { AppconstantsService } from 'app/service/core/appconstants.service';
import { HttpUtilityService } from 'app/service/core/httputility.service';
import { HelperService } from 'app/service/core/helper.service';
import { AddReelComponent } from './add-reel/add-reel.component';

@Component({
	selector: 'ms-reel',
	templateUrl: './reel.component.html',
	styleUrls: ['./reel.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation],
})
export class ReelComponent implements OnInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild('child') child: AddReelComponent;
	popUpNewUserResponse: any;
	popUpEditUserResponse: any;
	popUpDeleteUserResponse: any;
  usermanagelist: any;
  reelsList: any;
	showType: string = 'grid';
	searchVal: string = "";
	isAdd: boolean = false;
  reelLocation: string = "";

	color = {
		"Platinum": "primary",
		"Gold": "accent",
		"Silver": "warn"
	}

	displayedColumns: string[] = ['select', 'title', 'id', 'dateCreated', 'from', 'to', 'user', 'action'];
	dataSource = new MatTableDataSource<any>();
	selection = new SelectionModel<any>(true, []);
	userInfo: any;
	detailPageData: any;
	constructor(public http: HttpUtilityService, private helper: HelperService, private coreService: CoreService) { }

	ngOnInit() {
    var data = this.helper.getDataFromStorageDetails("BranchInfo");
		if (data) {
      data = JSON.parse(data);
      console.log('brachInfo:', data)
      this.userInfo = data.UserDetails;
      this.reelLocation = data.BranchInfo.GetReelLocationPath;
		}
		this.getDataFromServer();
	}

	getDataFromServer() {
		this.dataSource.paginator = this.paginator;
		this.usermanagelist = [];
		this.http.get(AppconstantsService.ReelAPIS.GetReelByBranchCode).then((data: any) => {
			console.log(data);
      data.forEach(element => {
        var filePath = element.ReelLocation;
        var isVideo = '2';
        if (element.Filename.trim() == "")
          isVideo = "0"
        else if (element.Filename.indexOf("mp4") != -1)
          isVideo = '1';

				this.usermanagelist.push({
					id: element.ReelID,
					title: element.ReelTitle,
					dateCreated: this.getDate(element.CreateDate),
					from: this.getDate(element.StartDate),
					to: this.getDate(element.ExpiryDate),
          user: this.userInfo.userName,
          isVideo: isVideo,
          filePath: filePath,
          ReelViewCount: element.ReelViewCount,
          statusIcon: this.getOrderStatsImage(element.ReelStatus),
          statusColor: this.getOrderStatsColor(element.ReelStatus),
          status: this.getOrderStatsText(element.ReelStatus)
        })

        console.log(filePath);
      });
      this.reelsList = data;
			this.getUserList(this.usermanagelist);
		}, (error: any) => { });
	}

	onAnyAction(e: any, modal: any) {
		console.log(e);
		switch (e.action) {
			case 'save':
				this.isAdd = false;
				this.getDataFromServer();
				break;
			default:
				break;
		}
	}

	getDate(date: any) {
		if (!date) {
			return;
		}
		var trimDate = date.split(" ")[0];
		var dates = trimDate.split("-");
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return dates[0] + " " + monthNames[dates[1] - 1] + ", " + dates[2];
	}

	//getUserList method is used to get the user management list data.
	getUserList(res) {
		// this.usermanagelist = res;
		// this.usermanagelist.map((x, i) => {
		// 	this.usermanagelist[i].from = new Date(),
		// 		this.usermanagelist[i].to = new Date(),
		// 		this.usermanagelist[i].id = i + 1,
		// 		this.usermanagelist[i].title = `Title ${i + 1}`
		// })
		this.dataSource = new MatTableDataSource<any>(this.usermanagelist);
		setTimeout(() => {
			this.dataSource.paginator = this.paginator;
		}, 0)
	}

	onVideoPlayer(url) {
		//this.coreService.videoPlayerDialog("https://www.youtube.com/watch?v=rbTVvpHF4cU");
    console.log(url);
    this.coreService.videoPlayerDialog(url);
  }

	productShowType(type: string) {
		this.showType = type;
	}

	searchInput() {
		// var searchValue = this.searchVal;
		// if (searchValue.length == 1) {
		// 	this.allRows = this.config.data;
		// }
	}

	searchColumn() {
		// var searchValue = this.searchVal;
		// if (searchValue == "") {
		//   this.tableRefresh();
		//   return;
		// }
		// this.config.data = this.filter(this.allRows, searchValue);
		// this.page = 0;
		// this.config.totalRows = this.config.data.length;
	}

	/**
	  * Whether the number of selected elements matches the total number of rows.
	  */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/**
	  * Selects all rows if they are not all selected; otherwise clear selection.
	  */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getOrderStatsImage(status): string {
    var statusImage = './assets/img/orderStatus/ordered.png';
    if (status == 'reject') {
      statusImage = './assets/img/orderStatus/reject.png'
    } else if (status == '0') {
      statusImage = './assets/img/orderStatus/blocked.png'
    }
    return statusImage;
  }

  getOrderStatsColor(status): string {
    var statusImage = '#06d755';
    if (status == 'reject') {
      statusImage = 'red';
    } else if (status == '0') {
      statusImage = '#999999';
    }
    return statusImage;
  }

  getOrderStatsText(status): string {
    var statusImage = 'ACTIVE';
    if (status == 'reject') {
      statusImage = 'REJECTED';
    } else if (status == '0') {
      statusImage = 'BLOCKED';
    }
    return statusImage;
  }

	/**
	  * addNewUserDialog method is used to open a add new user dialog.
	  */
	addNewUserDialog() {
		this.coreService.addNewUserDailog().
			subscribe(res => { this.popUpNewUserResponse = res },
				err => console.log(err),
				() => this.getAddUserPopupResponse(this.popUpNewUserResponse))
	}

	/**
	  *getAddUserPopupResponse method is used to get a new user dialog response.
	  *if response will be get then add new user into user list.
	  */
	getAddUserPopupResponse(response: any) {
		if (response) {
			let addUser = {
				img: "assets/img/user-4.jpg",
				firstName: response.firstName,
				lastName: response.lastName,
				emailAddress: response.emailAddress,
				accountType: response.accountType,
				status: "Active",
				statusTime: "Since 1 hour",
				dateCreated: new Date(),
				accountTypeColor: this.color[response.accountType]
			}
			this.usermanagelist.push(addUser);
			this.dataSource = new MatTableDataSource<any>(this.usermanagelist);
			this.dataSource.paginator = this.paginator;
		}
	}

	/**
	  *onDelete method is used to open a delete dialog.
	  */
	onDelete(i) {
		this.coreService.deleteDialog("Are you sure you want to delete this user permanently?").
			subscribe(res => { this.popUpDeleteUserResponse = res },
				err => console.log(err),
				() => this.getDeleteResponse(this.popUpDeleteUserResponse, i))
	}

	/**
	  * getDeleteResponse method is used to delete a user from the user list.
	  */
	getDeleteResponse(response: string, i) {
		if (response == "yes") {
			this.http.delete(AppconstantsService.ReelAPIS.DelReelByReelID + this.usermanagelist[i].id).then((data: any) => {
				this.getDataFromServer();
			});
		}
	}

	/**
	  * onEdit method is used to open a edit dialog.
	  */
	onEdit(data, index) {
    //console.log(data);
    console.log('EditItems:', this.reelsList[index]);
		this.isAdd = true;
    //this.http.detailPageData = data;
    this.http.detailPageData = this.reelsList[index];
		// this.coreService.editList(data).
		// 	subscribe(res => { this.popUpEditUserResponse = res },
		// 		err => console.log(err),
		// 		() => this.getEditResponse(this.popUpEditUserResponse, data, index))
	}

	/**
	  * getEditResponse method is used to edit a user data.
	  */
	getEditResponse(response: any, data, i) {
		if (response) {
			this.usermanagelist[i].firstName = response.firstName,
				this.usermanagelist[i].lastName = response.lastName,
				this.usermanagelist[i].emailAddress = response.emailAddress,
				this.usermanagelist[i].accountType = response.accountType,
				this.usermanagelist[i].accountTypeColor = this.color[response.accountType]
		}
	}
}
