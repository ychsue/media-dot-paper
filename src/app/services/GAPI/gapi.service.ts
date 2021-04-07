import { Injectable } from "@angular/core";
import { service } from "../../IO/GAPI";

@Injectable({
  providedIn: "root",
})
export class GapiService {
  public service: typeof service;

  constructor() {
    this.service = service;
  }
}
