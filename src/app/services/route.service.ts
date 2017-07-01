import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanDeactivateRoute {
  canDeactivateRoute();
}

@Injectable()
export class DeactivateRouteGuard implements CanDeactivate<CanDeactivateRoute> {
  canDeactivate(comp:CanDeactivateRoute){
    debugger;
    return comp.canDeactivateRoute? comp.canDeactivateRoute(): true;
  }
}
