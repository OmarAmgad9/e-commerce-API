import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuardGuard: CanActivateFn = (route, state) => {

  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  let valueOfToken:any={};
  valueOfToken = _AuthService.currentUser.getValue();
  if (valueOfToken.role == 'admin' || valueOfToken.role == 'manager') {
    return true
  }else{
    _Router.navigate(['/login']);
    return false
  }
};
