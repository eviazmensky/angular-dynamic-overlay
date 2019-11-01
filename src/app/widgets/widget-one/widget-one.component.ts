import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs'
import { OverlayService } from '../../services/overlay.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-widget-one',
  templateUrl: './widget-one.component.html',
  styleUrls: ['./widget-one.component.css']
})
export class WidgetOneComponent implements OnInit {
  @Input() id: string;
  private spinner$: Subject<any> = new Subject();

  constructor(private overlayService: OverlayService) {}

  ngOnInit() {
    this.spinner$.pipe(
      delay(500)
    ).subscribe( () => this.overlayService.stop(this.id));
  }

  showOverlay() {
    this.overlayService.start(this.id);
    this.spinner$.next('');
  }

}