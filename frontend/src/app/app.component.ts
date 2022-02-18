import { Component } from '@angular/core';
import { LinkService } from './shared/link.service';
import { Link } from './shared/link.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  link: Link | null = null;

  originalUrl = '';
  isLinkRequested = false;

  apiUrl = environment.apiUrl;

  constructor(
    private linkService: LinkService,
  ) {}

  onSubmit() {
    if (!this.isValidForm()) {
      return;
    }

    this.isLinkRequested = true;
    this.linkService.getLink(this.originalUrl)
      .subscribe({
        next: (link) => {
          this.link = link;
          this.isLinkRequested = false;
        },
        error: () => {
          this.isLinkRequested = false;
        }
      });
  }

  isValidForm() {
    return this.originalUrl && !this.isLinkRequested;
  }

}
