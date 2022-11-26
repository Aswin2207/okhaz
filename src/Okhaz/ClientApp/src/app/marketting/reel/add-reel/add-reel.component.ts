import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PageTitleService } from '../../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppconstantsService } from 'app/service/core/appconstants.service';
import { HttpUtilityService } from 'app/service/core/httputility.service';
import { HelperService } from 'app/service/core/helper.service';

@Component({
	selector: 'add-reel',
	templateUrl: './add-reel.component.html',
	styleUrls: ['./add-reel.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class AddReelComponent implements OnInit {
 
	uploader: FileUploader = new FileUploader({ url: 'https://evening-anchorage-3159.herokuapp.com/api/' });
	hasBaseDropZoneOver = false;
	hasAnotherDropZoneOver = false;
	public form: FormGroup;
	@Output() onCancel: EventEmitter<any> = new EventEmitter();
	@Output("onAnyAction") onAnyAction: EventEmitter<any> = new EventEmitter();
	branchInfo: any;
  userInfo: any;
  isEdit: boolean = false;

	constructor(public http: HttpUtilityService, private helper: HelperService, private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService) { }

	ngOnInit() {
    var data = this.helper.getDataFromStorageDetails("BranchInfo");
    this.isEdit = false;
    //console.log('set form values:', this.http);
		if (data) {
			data = JSON.parse(data);
			this.branchInfo = data.BranchInfo;
      this.userInfo = data.UserDetails;
      this.uploader = new FileUploader({ url: data.BranchInfo.GetReelLocationPath });

      console.log(data.BranchInfo.GetReelLocationPath);
		}
		setTimeout(() => {
			this.pageTitleService.setTitle("Upload");
		}, 0);
		this.form = this.fb.group({
			fname: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
			from: [null, Validators.compose([Validators.required, CustomValidators.date])],
			to: [null, Validators.compose([Validators.required, CustomValidators.date])],
			status: [true]
    });

    console.log('httpData11', this.http.detailPageData);
    //this.getDataFromServer(this.http.detailPageData.id);
    this.setFormValues();
	}

  setFormValues() {
    console.log('set form values:', this.http);
    if (this.http.detailPageData) {
      this.isEdit = true;
			var data = this.http.detailPageData;
      this.form.get('fname').setValue(data.ReelTitle);
      this.form.get('from').setValue(this.formatDate(data.StartDate));
      this.form.get('to').setValue(this.formatDate(data.ExpiryDate));
      this.form.get('status').setValue(data.ReelStatus==1?true:false);
		}
  }

  formatDate(date) {
    var d = date.split(" ")
    var tmp = d[0].split("-");
    return tmp[2] + "-" + tmp[1] + "-" + tmp[0];
}

  getDataFromServer(ReelID) {
    console.log('test get data1s');
    this.http.get(AppconstantsService.ReelAPIS.GetReelByReelID + ReelID ).then((data: any) => {
      console.log(data);
     
    }, (error: any) => { });
  }

	get f() {
		return this.form.controls;
	}

	/**
	   *fileOverBase fires during 'over' and 'out' events for Drop Area.
	   */
	fileOverBase(e: any): void {
		this.hasBaseDropZoneOver = e;
	}

	/**
	   *fileOverAnother fires after a file has been dropped on a Drop Area.
	   */
	fileOverAnother(e: any): void {
		this.hasAnotherDropZoneOver = e;
	}

	cancel() {
		this.onCancel.emit('cancel');
	}

  saveReel() {
    var postAction = AppconstantsService.ReelAPIS.CreateReel;
    if (this.isEdit == true) {
      postAction = AppconstantsService.ReelAPIS.UpdateReel;
    }

		if(this.uploader.queue.length>0) {
			this.uploader.queue.forEach(item=>{
				var createReeelJson = {
					BranchID: this.branchInfo.branchid,
					ReelTitle: this.f.fname.value,
					StartDate: new Date(this.f.from.value),
					ExpiryDate: new Date(this.f.to.value),
					CreateDate: new Date(),
					LastUpdateDate: new Date(),
					UserID: this.userInfo.id,
          ReelLocation: item.url + item._file.name,
					ReelStatus: this.f.status.value==true?1:0,
					ReelViewCount: 0,
					Filename: item._file.name,
					Fileheight: '',
					Filewidth: '',
					Filesize: item._file.size.toString(),
          DeviceName: 'web',
          ReelID: (this.isEdit == true) ? parseInt(this.http.detailPageData.ReelID) : 0
        }

        this.http.post(postAction, createReeelJson).then((data: any) => {
					if(data) {
						this.onAnyAction.emit({action: 'save' });
					}
				});
			});
			return;
		}
		var createReeelJson = {
			BranchID: this.branchInfo.branchid,
			ReelTitle: this.f.fname.value,
			StartDate: new Date(this.f.from.value),
			ExpiryDate: new Date(this.f.to.value),
			CreateDate: new Date(),
			LastUpdateDate: new Date(),
			UserID: this.userInfo.id,
			ReelLocation: '',
			ReelStatus: this.f.status.value==true?1:0,
			ReelViewCount: 0,
			Filename: '',
			Fileheight: '',
			Filewidth: '',
			Filesize: '',
      DeviceName: 'web',
      ReelID: (this.isEdit == true) ? parseInt(this.http.detailPageData.ReelID) : 0
    }

    this.http.post(postAction, createReeelJson).then((data: any) => {
			if(data) {
				this.onAnyAction.emit({action: 'save' });
			}
		});
	}

	ngOnDestroy() {
		this.http.detailPageData = null;
	  }
}



