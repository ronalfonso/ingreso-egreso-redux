import {createAction, props} from '@ngrx/store';
import {IngressEgress} from "../api/models/ingress-egress.model";

export const setItems = createAction(
  '[IngresoEgreso] Set Items',
  props<{items: IngressEgress[]}>()
);
export const unSetItems = createAction('[IngresoEgreso] UnSet Items');
