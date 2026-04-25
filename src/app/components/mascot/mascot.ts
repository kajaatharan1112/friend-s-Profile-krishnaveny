import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mascot',
  imports: [],
  templateUrl: './mascot.html',
  styleUrl: './mascot.css'
})
export class MascotComponent implements OnInit, OnDestroy {
  visible = true;
  fanOpen = false;
  minimized = false;

  private fanTimer: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) private pid: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.pid)) return;

    // First fan after 3 seconds
    setTimeout(() => {
      this.fanOpen = true;
      setTimeout(() => { this.fanOpen = false; }, 2200);
    }, 3000);

    // Fan every 8 seconds after that
    this.fanTimer = setInterval(() => {
      this.fanOpen = true;
      setTimeout(() => { this.fanOpen = false; }, 2200);
    }, 8000);
  }

  ngOnDestroy() {
    if (this.fanTimer) clearInterval(this.fanTimer);
  }

  toggle(): void { this.minimized = !this.minimized; }

  dismiss(): void {
    this.visible = false;
    if (this.fanTimer) {
      clearInterval(this.fanTimer);
      this.fanTimer = null;
    }
  }
}
