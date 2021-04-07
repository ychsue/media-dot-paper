import { Injectable } from "@angular/core";
import { service } from "../../IO/ZIP";
@Injectable({
  providedIn: "root",
})
export class ZipService {
  public service: typeof service;

  constructor() {
    this.service = service;
  }
}
