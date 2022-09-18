import { createReducer, on } from '@ngrx/store';
import {setUser, unSetUser} from './auth.actions';
import {User} from "../api/models/user.model";

export interface AuthState {
    user: User;
}

export const initialState: AuthState = {
    user: null,
};

export const _authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({ ...state, user: {...user} })),
  on(unSetUser, state => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
