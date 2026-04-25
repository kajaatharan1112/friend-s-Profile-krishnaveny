import { Component, HostListener, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  scrolled   = false;
  menuOpen   = false;
  darkMode   = false;
  palettes = ['obsidian', 'emerald', 'plum'] as const;
  currentPalette: (typeof this.palettes)[number] = 'obsidian';

  links = [
    { label: 'Home',       href: '#hero' },
    { label: 'About',      href: '#about' },
    { label: 'Skills',     href: '#skills' },
    { label: 'Education',  href: '#education' },
    { label: 'Activities', href: '#extracurricular' },
    { label: 'Contact',    href: '#contact' },
  ];

  constructor(@Inject(PLATFORM_ID) private pid: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.pid)) return;
    const savedPalette =
      (localStorage.getItem('palette') as (typeof this.palettes)[number] | null) ??
      (localStorage.getItem('darkPalette') as (typeof this.palettes)[number] | null);
    if (savedPalette && this.palettes.includes(savedPalette)) {
      this.currentPalette = savedPalette;
    }

    // Always start in light mode after refresh.
    this.darkMode = false;

    this.applyTheme();
  }

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 20; }

  toggleDark() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
  }

  cyclePalette() {
    const currentIndex = this.palettes.indexOf(this.currentPalette);
    const nextIndex = (currentIndex + 1) % this.palettes.length;
    this.currentPalette = this.palettes[nextIndex];
    localStorage.setItem('palette', this.currentPalette);
    this.applyTheme();
  }

  private applyTheme() {
    document.documentElement.setAttribute('data-palette', this.currentPalette);

    if (this.darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  scrollTo(href: string) {
    this.menuOpen = false;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
