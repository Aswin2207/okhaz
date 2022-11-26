import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'ms-customer-review',
	templateUrl: './customer-review.component.html',
	styleUrls: ['./customer-review.component.scss']
})
export class CustomerReviewComponent implements OnInit {

	ideaCount: number = 0;
	commentCount: number = 0;
	allActive: boolean = false;
	tabIndex: number = 0;

	feedbackList: any[] = [
		{
			type: "comment",
			image: "assets/img/user-1.jpg",
			name: "Ramona Smith",
			comment: "You Will Never Believe These Bizarre Truth Of",
			feedback: "Lorem ipsum dolor sit amet consectetur",
			rating: 4,
			isActive: true,
			time: "8 hours ago"
		},
		{
			type: "idea",
			image: "assets/img/user-2.jpg",
			name: "Kristen McFalls",
			comment: "This Is Why This Year Will Be The Year Of",
			isActive: true,
			rating: 3,
			feedback: "Adipisicing elit, incididunt ut labore",
			time: "5 hour ago"
		},
		{
			type: "comment",
			image: "assets/img/user-3.jpg",
			name: "Antoine Downs",
			isActive: false,
			rating: 5,
			comment: "The 15 Secrets You Will Never Know About",
			feedback: "Velit esse cillum dolore eu fugiat nulla",
			time: "4 hours ago"
		},
		{
			type: "idea",
			image: "assets/img/user-4.jpg",
			isActive: true,
			rating: 5,
			name: "Patricia Gonzalez",
			comment: "You Will Never Believe These Bizarre Truth Of",
			feedback: "Sunt in culpa qui officia deserunt mollit anim",
			time: "10 hour ago"
		},
		{
			type: "comment",
			image: "assets/img/user-5.jpg",
			isActive: false,
			rating: 1,
			name: "Shirley Johnson",
			comment: "Ten Important Facts That You Should Know About",
			feedback: "Excepteur sint occaecat cupidatat non",
			time: "15 hours ago"
		},
		{
			type: "idea",
			image: "assets/img/user-1.jpg",
			isActive: false,
			rating: 5,
			name: "Gladys Rice",
			comment: "How Is Going To Change Your Business Strategies",
			feedback: "Duis aute irure dolor in reprehenderit sint",
			time: "10 hour ago"
		},
		{
			type: "idea",
			isActive: true,
			rating: 2,
			image: "assets/img/user-3.jpg",
			name: "Patricia Mullins",
			comment: "Will Be A Thing Of The Past And Here's Why",
			feedback: "Officia deserunt mollit anim id est laborum",
			time: "10 hour ago"
		},
		{
			type: "idea",
			isActive: true,
			rating: 4,
			image: "assets/img/user-4.jpg",
			name: "Jennifer Lara",
			comment: "This template gives us new idea",
			feedback: "Lorem ipsum dolor sit amet consectetur",
			time: "10 hour ago"
		}
	]

	constructor(private translate: TranslateService) { }

	ngOnInit() {
		this.feedbackCount();
	}

	//feedbackCount method is used to count the feedback of idea and comment.
	feedbackCount() {
		for (let data of this.feedbackList) {
			if ((data.type) == 'comment') {
				this.commentCount = this.commentCount + 1;
			}
			else {
				this.ideaCount = this.ideaCount + 1;
			}
		}
	}

	toggle(e: any, isAll: boolean, device: any) {
		if (isAll) {
			switch (this.tabIndex) {
				case 0: this.feedbackList.map(x => x.isActive = e.checked);
					break;
				case 1: this.feedbackList.map(x => x.isActive = x.type == 'idea' ? e.checked : x.isActive);
					break;
				case 2: this.feedbackList.map(x => x.isActive = x.type == 'comment' ? e.checked : x.isActive);
					break;
			}

		} else {
			device.value = e.checked;
			this.allActive = this.feedbackList.filter(x => x.isActive).length == this.feedbackList.length ? true : false;
		}
	}

	setTab(e) {
		this.tabIndex = e.index;
	}

}
