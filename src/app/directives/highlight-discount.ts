import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightDiscount]',
  standalone: true
})
export class HighlightDiscountDirective implements OnInit {
  @Input() appHighlightDiscount: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.appHighlightDiscount < 5000) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', '#10b981');
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');

      const badge = this.renderer.createElement('span');
      const text = this.renderer.createText('GREAT DEAL');
      this.renderer.appendChild(badge, text);

      this.renderer.setStyle(badge, 'position', 'absolute');
      this.renderer.setStyle(badge, 'top', '12px');
      this.renderer.setStyle(badge, 'right', '12px');
      this.renderer.setStyle(badge, 'background', '#10b981');
      this.renderer.setStyle(badge, 'color', 'white');
      this.renderer.setStyle(badge, 'padding', '6px 12px');
      this.renderer.setStyle(badge, 'font-size', '10px');
      this.renderer.setStyle(badge, 'font-weight', '800');
      this.renderer.setStyle(badge, 'border-radius', '40px');
      this.renderer.setStyle(badge, 'z-index', '10');
      this.renderer.setStyle(badge, 'letter-spacing', '0.5px');
      this.renderer.setStyle(badge, 'box-shadow', '0 4px 12px rgba(16, 185, 129, 0.3)');

      this.renderer.appendChild(this.el.nativeElement, badge);
    }
  }
}
