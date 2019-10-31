import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-one',
  templateUrl: './widget-one.component.html',
  styleUrls: ['./widget-one.component.css']
})
export class WidgetOneComponent implements OnInit {
  @Input() id: string;

  constructor() { }

  ngOnInit() {
  }

}