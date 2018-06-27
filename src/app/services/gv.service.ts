import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GvService {

  shownPage = PageType.Home;
  constructor() { }
}

export enum PageType {
  Home,
  MediaEdit,
  Test
}
