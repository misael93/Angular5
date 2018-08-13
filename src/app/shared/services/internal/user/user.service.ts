import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  setActiveToken(body: string): boolean {
    localStorage.setItem('token', body);
    return true;
  }

  getActiveToken(name: string): string {
    return localStorage.getItem(name);
  }

  removeActiveToken(name: string): void {
    localStorage.removeItem(name);
  }

}
