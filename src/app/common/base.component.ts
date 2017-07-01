import { CanDeactivateRoute } from '../services/route.service';

export class BaseComponent implements CanDeactivateRoute {
  disDataLoss:boolean = false;

  canDeactivateRoute(){
    return true;
  }
}
