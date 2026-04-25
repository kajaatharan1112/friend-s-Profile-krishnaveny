import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  photos = [
    'image/WhatsApp Image 2026-04-05 at 11.53.44.jpeg',
    'image/WhatsApp Image 2026-04-05 at 11.53.45.jpeg',
    'image/WhatsApp Image 2026-04-05 at 11.53.45 (1).jpeg',
    'image/WhatsApp Image 2026-04-05 at 11.53.45 (2).jpeg',
    'image/WhatsApp Image 2026-04-05 at 11.53.46.jpeg',
  ];

  langs = [
    { name: 'Tamil',   pct: 100 },
    { name: 'English', pct: 85  },
    { name: 'Sinhala', pct: 60  },
  ];

  activePhoto: number | null = null;

  openPhoto(index: number): void {
    this.activePhoto = index;
    document.body.style.overflow = 'hidden';
  }

  closePhoto(): void {
    this.activePhoto = null;
    document.body.style.overflow = '';
  }

  prevPhoto(): void {
    if (this.activePhoto === null) return;
    this.activePhoto = (this.activePhoto - 1 + this.photos.length) % this.photos.length;
  }

  nextPhoto(): void {
    if (this.activePhoto === null) return;
    this.activePhoto = (this.activePhoto + 1) % this.photos.length;
  }

  onKey(event: KeyboardEvent): void {
    if (this.activePhoto === null) return;
    if (event.key === 'Escape')      this.closePhoto();
    if (event.key === 'ArrowLeft')   this.prevPhoto();
    if (event.key === 'ArrowRight')  this.nextPhoto();
  }
}
