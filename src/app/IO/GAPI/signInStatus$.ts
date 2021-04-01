import { Subject } from "rxjs";
import { service } from "./service";

export const signInStatus$ = new Subject<boolean>();
