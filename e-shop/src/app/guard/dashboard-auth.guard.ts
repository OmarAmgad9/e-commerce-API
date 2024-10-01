import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const dashboardAuthGuard: CanActivateFn = (route, state) => {

  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  let valueOfToken:any={};
  valueOfToken = _AuthService.currentUser.getValue();
  if (valueOfToken.role == 'manager') {
    console.log(valueOfToken.role)
    return true
  }else{
    _Router.navigate(['/login']);
    return false
  }
};
