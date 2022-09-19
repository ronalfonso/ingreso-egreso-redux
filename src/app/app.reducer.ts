import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from "./auth/auth.reducer";
import * as ingressEgress from "./ingreso-egreso/ingreso-egreso.reducer";


export interface AppState {
  ui: ui.UiState,
  auth: auth.AuthState
  ingressEgress: ingressEgress.IngressEgressState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  ingressEgress: ingressEgress.ingressEgressReducer
}
