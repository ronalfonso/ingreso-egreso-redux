import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from "./auth/auth.reducer";

export interface AppState {
  ui: ui.UiState,
  auth: auth.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer
}
