import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeHtml } from '@angular/platform-browser';

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

@Pipe({
  name: 'safeHtml',
  pure: true
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) {}

  transform(html: string, args?: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
