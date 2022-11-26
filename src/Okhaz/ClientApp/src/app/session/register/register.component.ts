import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { EcommerceService } from '../../service/ecommerce/ecommerce.service';
import { HelperService } from 'app/service/core/helper.service';
import { AppconstantsService } from 'app/service/core/appconstants.service';
import { HttpUtilityService } from 'app/service/core/httputility.service';
import { da } from 'date-fns/locale';
import { AuthService } from 'app/service/auth-service/auth.service';

@Component({
	selector: 'ms-register',
	templateUrl: './register-component.html',
	styleUrls: ['./register-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class EditProfileComponent implements OnInit {
	billingForm: FormGroup;
	mailChangeForm: FormGroup;
	passwordChangeForm: FormGroup;
	countries: any;
	branchInfo: any;
	userInfo: any;
	userDetails: any;

	constructor(public http: HttpUtilityService,
		private authService: AuthService, private pageTitleService: PageTitleService, private helper: HelperService, public ecommerceService: EcommerceService, private formBuilder: FormBuilder, private modalService: NgbModal) { }

	ngOnInit() {
		var data = this.helper.getDataFromStorageDetails("BranchInfo");
		if (data) {
			data = JSON.parse(data);
			this.branchInfo = data.BranchInfo;
			this.userInfo = data.UserDetails;
		}
		this.billingForm = this.formBuilder.group({
			name: [''],
			lastName: [''],
			email: [''],
			mobile: [''],
			address1: [''],
			address2: [''],
			country: [''],
			state: [''],
			city: [''],
			validate: ['']
		});
		this.mailChangeForm = this.formBuilder.group({
			oldEmail: ['', [Validators.required, Validators.email]],
			newEmail: ['', [Validators.required, Validators.email]],
			confirmEmail: ['', [Validators.required, Validators.email]]
		});
		this.passwordChangeForm = this.formBuilder.group({
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]],
		});
		this.getCountry();
		setTimeout(() => {
			this.pageTitleService.setTitle("User Profile");
		}, 0);
		this.getUserDetails();
	}

	get f() {
		return this.billingForm.controls;
	}

	get mailF() {
		return this.mailChangeForm.controls;
	}

	get passwordF() {
		return this.passwordChangeForm.controls;
	}

	getUserDetails() {
		if (this.userInfo.userType == 'Supplier') {
			this.http.get(AppconstantsService.UsersAPIS.GetSupplierDetails + this.userInfo.id).then((data: any) => {
				this.userDetails = data[0];
				console.log(this.userDetails);
				var name = this.userDetails.suppName.split(' ');
				this.f.name.setValue(name[0]);
				if (name.length > 1) {
					this.f.lastName.setValue(name[1]);
				}
				this.f.address1.setValue(this.userDetails.suppAdd1);
				this.f.address2.setValue(this.userDetails.suppAdd2);
			}, (error: any) => { })
		} else {
			this.http.get(AppconstantsService.UsersAPIS.GetEmployeeDetails + this.userInfo.id).then((data: any) => {
				this.userDetails = data[0];
			}, (error: any) => { })
		}

	}

	updateProfile() {
		if (this.userInfo.userType == 'Supplier') {
			var updateJson = {
				suppID:this.userInfo.id,
				suppName:this.f.name.value+' '+this.f.lastName.value,
				suppAdd1:this.f.address1.value,
				suppAdd2:this.f.address2.value,
				suppTele:this.userDetails.suppTele,
				suppEmail:this.userInfo.emailId,
			}
			this.http.post(AppconstantsService.UsersAPIS.SupplierUpdateDetails, updateJson).then((data: any) => {
				this.getUserDetails();
			}, (error: any) => { })
		}
		this.modalService.dismissAll();
	}

	openModel(model) {
		this.modalService.open(model, { size: 'md', backdrop: 'static', centered: true, windowClass: "customModalClass" });
	}

	closeModel() {
		this.modalService.dismissAll();
	}

	updateEmail() {
		if (this.mailF.oldEmail.value !== this.userInfo.emailId) {
			alert("Old email is not correct");
			return;
		}
		if (this.mailF.newEmail.value !== this.mailF.confirmEmail.value) {
			alert("New email is not matching");
			return;
		}
		if (this.mailF.oldEmail.value === this.mailF.newEmail.value) {
			alert("Both previous and new email id are same.");
			return;
		}
		this.http.post(AppconstantsService.profileAPIS.UpdateEmail_UserManager + this.userInfo.id + "/" + this.mailF.newEmail.value, {}).then((data: any) => {
			if (data) {
				alert("Email Updated. Login again");
				this.authService.logOut();
			}
		}, (error: any) => { })
	}

	updatePassword() {
		if (this.passwordF.oldPassword.value !== this.userInfo.passWord) {
			alert("Old password is not correct");
			return;
		}
		if (this.passwordF.newPassword.value !== this.passwordF.confirmPassword.value) {
			alert("New password is not matching");
			return;
		}
		if (this.passwordF.oldPassword.value === this.passwordF.newPassword.value) {
			alert("Both previous and new passwords are same.");
			return;
		}
		this.http.post(AppconstantsService.profileAPIS.UpdatePassword_UserManager + this.userInfo.id + "/" + this.passwordF.newPassword.value, {}).then((data: any) => {
			if (data) {
				alert("Password Updated. Login again");
				this.authService.logOut();
			}
		}, (error: any) => { })
	}

	getCountry() {
		this.ecommerceService.getCountries().
			subscribe(res => { this.countries = res['countries'] },
				err => console.log(err),
				() => this.countries
			);
	}

}
