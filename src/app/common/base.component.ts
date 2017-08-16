import { CanDeactivateRoute } from '../services/route.service';
import { GlobalObject } from '../services/app.types';

export class BaseComponent implements CanDeactivateRoute {
  disDataLoss: boolean = false;
  globalObject: GlobalObject;
  canDeactivateRoute() {
    return true;
  }

  constructor() {
  }
}
