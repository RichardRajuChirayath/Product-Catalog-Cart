import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appOutOfStock]',
  standalone: true
})
export class OutOfStockDirective implements OnInit {
  @Input('appOutOfStock') isOutOfStock: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.isOutOfStock) {
      this.renderer.setStyle(this.el.nativeElement, 'filter', 'grayscale(100%) brightness(0.8)');
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

      const overlay = this.renderer.createElement('div');
      const text = this.renderer.createText('TEMPORARILY UNAVAILABLE');
      this.renderer.appendChild(overlay, text);

      this.renderer.setStyle(overlay, 'position', 'absolute');
      this.renderer.setStyle(overlay, 'top', '50%');
      this.renderer.setStyle(overlay, 'left', '50%');
      this.renderer.setStyle(overlay, 'transform', 'translate(-50%, -50%)');
      this.renderer.setStyle(overlay, 'background', 'rgba(15, 23, 42, 0.9)');
      this.renderer.setStyle(overlay, 'backdrop-filter', 'blur(4px)');
      this.renderer.setStyle(overlay, 'color', 'white');
      this.renderer.setStyle(overlay, 'padding', '12px 24px');
      this.renderer.setStyle(overlay, 'font-weight', '700');
      this.renderer.setStyle(overlay, 'font-size', '12px');
      this.renderer.setStyle(overlay, 'border-radius', '40px');
      this.renderer.setStyle(overlay, 'z-index', '20');
      this.renderer.setStyle(overlay, 'pointer-events', 'none');
      this.renderer.setStyle(overlay, 'white-space', 'nowrap');
      this.renderer.setStyle(overlay, 'border', '1px solid rgba(255,255,255,0.1)');

      this.renderer.appendChild(this.el.nativeElement, overlay);
    }
  }
}
