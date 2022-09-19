import { createReducer, on } from '@ngrx/store';
import {setItems, unSetItems} from './ingreso-egreso.actions';
import {IngressEgress} from "../api/models/ingress-egress.model";

export interface IngressEgressState {
    items: IngressEgress[];
}

export const initialState: IngressEgressState = {
    items: [],
};

export const _ingressEgressReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] })),
);

export function ingressEgressReducer(state, action) {
    return _ingressEgressReducer(state, action);
}
