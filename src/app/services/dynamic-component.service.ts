import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from "@angular/core";

@Injectable()
export class DynamicComponentService {
  componentRefs: { id: string; componentRef: ComponentRef<any> }[];
  domElements: { id: string; domElement: HTMLElement }[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {
    this.componentRefs = new Array<{
      id: string;
      componentRef: ComponentRef<any>;
    }>();
    this.domElements = new Array<{
      id: string;
      domElement: HTMLElement;
    }>();
  }

  loadComponent(id: string, component: any, componentParams: object[]) {
    let componentRef: ComponentRef<
      any
    > = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    componentParams.forEach(param => {
      componentRef.instance[param["key"]] = param["value"];
    });

    this.appRef.attachView(componentRef.hostView);

    let domElement: HTMLElement = (componentRef.hostView as EmbeddedViewRef<
      any
    >).rootNodes[0] as HTMLElement;

    document.getElementById(id).appendChild(domElement);

    this.componentRefs.push({ id: id, componentRef: componentRef });
    this.domElements.push({ id: id, domElement: domElement });
  }

  unloadComponent(id: string) {
    if (id && document.getElementById(id)) {
      const domElement = this.domElements.find(domElem => {
        return domElem.id === id;
      });
      try {
        document.getElementById(id).removeChild(domElement.domElement);
      } catch (e) {
        console.warn("loader already removed!");
      }
      this.domElements.splice(this.domElements.indexOf(domElement), 1);

      const componentRef = this.componentRefs.find(componentRef => {
        return componentRef.id === id;
      });

      this.appRef.detachView(componentRef.componentRef.hostView);
      componentRef.componentRef.destroy();
      this.componentRefs.splice(this.componentRefs.indexOf(componentRef), 1);
    }
  }
}
