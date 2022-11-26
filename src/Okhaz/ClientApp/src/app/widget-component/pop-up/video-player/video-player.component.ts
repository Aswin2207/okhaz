import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ms-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

	yt_iframe_html : any;
  video: string;

	constructor(public dialogRef : MatDialogRef<VideoPlayerComponent>,
    private embedService: EmbedVideoService,
    private sanitizer: DomSanitizer  ) {
    setTimeout(() => {
      //this.yt_iframe_html = this.embedService.embed(this.video);
      //this.yt_iframe_html = this.embedService.embed('https://www.youtube.com/watch?v=rbTVvpHF4cU');
      this.yt_iframe_html = this.sanitizer.bypassSecurityTrustHtml('<iframe src="' + this.video + '" frameborder="0" allowfullscreen> </iframe>');
		},200)	

		var body = document.body;
		body.classList.add("video-popup");	
	}

	ngOnInit() {
	}

	ngOnDestroy(){
		var body = document.body;
		body.classList.remove("video-popup");
	}

}
