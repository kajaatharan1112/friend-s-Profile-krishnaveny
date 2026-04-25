import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  imports: [],
  templateUrl: './cursor.html',
  styleUrl: './cursor.css'
})
export class CursorComponent implements OnInit, OnDestroy {
  private dot!: HTMLElement;
  private ring!: HTMLElement;
  private mx = 0; private my = 0;
  private rx = 0; private ry = 0;
  private raf!: number;

  constructor(@Inject(PLATFORM_ID) private pid: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.pid)) return;

    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.dot  = document.getElementById('cursor-dot')!;
    this.ring = document.getElementById('cursor-ring')!;
    if (!this.dot || !this.ring) return;

    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mousedown', this.onDown);
    document.addEventListener('mouseup',   this.onUp);
    document.addEventListener('mouseover', this.onOver);
    document.addEventListener('mouseout',  this.onOut);

    this.loop();
  }

  onMove = (e: MouseEvent) => {
    this.mx = e.clientX; this.my = e.clientY;
    this.dot.style.left = this.mx + 'px';
    this.dot.style.top  = this.my + 'px';
  };

  onDown = () => {
    this.ring.style.transform = 'translate(-50%,-50%) scale(0.82)';
  };
  onUp = () => {
    this.ring.style.transform = 'translate(-50%,-50%) scale(1)';
  };

  onOver = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('a,button,.extra-card,.skill-card,.photo-item,.ref-card')) {
      this.dot.style.opacity  = '0';
      this.ring.style.width   = '52px';
      this.ring.style.height  = '52px';
      this.ring.style.background = 'rgba(28,28,30,0.07)';
    }
  };

  onOut = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('a,button,.extra-card,.skill-card,.photo-item,.ref-card')) {
      this.dot.style.opacity  = '1';
      this.ring.style.width   = '28px';
      this.ring.style.height  = '28px';
      this.ring.style.background = 'transparent';
    }
  };

  loop = () => {
    // Lerp ring toward mouse
    this.rx += (this.mx - this.rx) * 0.13;
    this.ry += (this.my - this.ry) * 0.13;
    this.ring.style.left = this.rx + 'px';
    this.ring.style.top  = this.ry + 'px';
    this.raf = requestAnimationFrame(this.loop);
  };

  ngOnDestroy() {
    if (!isPlatformBrowser(this.pid)) return;
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mousedown', this.onDown);
    document.removeEventListener('mouseup',   this.onUp);
    document.removeEventListener('mouseover', this.onOver);
    document.removeEventListener('mouseout',  this.onOut);
    cancelAnimationFrame(this.raf);
    document.body.style.cursor = '';
  }
}
