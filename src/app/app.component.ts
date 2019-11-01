import { Component, OnInit } from '@angular/core';
import { OverlayService } from './services/overlay.service';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular';
  private spinner$: Subject<any> = new Subject();

  constructor(private overlayService: OverlayService) {}

  ngOnInit() {
    this.spinner$.pipe(
      delay(2500)
    ).subscribe(
       () => {
         this.overlayService.stop('wrapper');
         console.log('end overlay')
       }
    )
  }

  startOverlay() {
    this.overlayService.start('wrapper');
    this.spinner$.next(' ');
    console.log('start overlay');
  }
}
 