import { Injectable } from '@angular/core';
import { DynamicComponentService } from './dynamic-component.service';
import { OverlayComponent } from '../components/overlay/overlay.component';

@Injectable()
export class OverlayService {

  constructor(
    private dynamicComponentLoaderService: DynamicComponentService
  ) {}

  //Add spinner to a page or section
  start(id: string, size: string = "large", overlay: string = "white") {
    if (!this.checkSpinnerExists(id)) {
      this.dynamicComponentLoaderService.loadComponent(id, OverlayComponent, [
        { key: "size", value: size },
        { key: "overlay", value: overlay }
      ]);
    }
  }

  // Remove spinner from the component tree and from the DOM
  stop(id = "") {
    if (this.checkSpinnerExists(id)) {
      this.dynamicComponentLoaderService.unloadComponent(id);
    }
  }

  checkSpinnerExists(id: string) {
    let childrenComponents: Array<object>;
    childrenComponents = Array.from(document.getElementById(id).children);
    const spinnerComponent = childrenComponents.filter(child => {
      return (
        child["localName"] === "auth-viewer-spinner" ||
        child["nodeName"] === "AUTH-VIEWER-SPINNER"
      );
    });
    return spinnerComponent.length > 0;
  }

}