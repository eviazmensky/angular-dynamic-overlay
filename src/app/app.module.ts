import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DynamicComponentService } from './services/dynamic-component.service';
import { OverlayService } from './services/overlay.service';
import { OverlayComponent } from './components/overlay/overlay.component';
import { WidgetOneComponent } from './widgets/widget-one/widget-one.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, OverlayComponent, WidgetOneComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DynamicComponentService, OverlayService],
  entryComponents: [OverlayComponent]
})
export class AppModule { }
