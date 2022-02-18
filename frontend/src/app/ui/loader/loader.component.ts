import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  spinnerSize = '';
  spinnerView = 'border';

  @Input() isLoading = false;
  @Input() set size(size: string) {
    this.spinnerSize = size === 'sm' ? 'sm' : '';
  }
  @Input() set view(view: string) {
    this.spinnerView = view === 'border' || view === 'grow' ? view : 'border';
  }

  getStyle() {
    return [
      'spinner-' + this.spinnerView,
      this.spinnerSize ? 'spinner-' + this.spinnerView + '-' + this.spinnerSize : ''
    ];
  }
}
