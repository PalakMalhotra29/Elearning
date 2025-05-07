import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('token') == null){
    return false;
  }else{
    return true;
  }
};
