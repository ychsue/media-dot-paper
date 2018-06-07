import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  pure: true
})
export class SafePipe implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) {}

  transform(url: string, args?: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
