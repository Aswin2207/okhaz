import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() config: any= {
    fieldValue:''
  }
  name = 'Angular';
  content = '<p>Hi</p>';
  formControl:any;
  onContentChange(e:any) {
    console.log(this.config.fieldValue);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
