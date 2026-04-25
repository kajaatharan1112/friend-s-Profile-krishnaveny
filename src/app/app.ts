import { Component, OnInit, AfterViewInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { SkillsComponent } from './components/skills/skills';
import { EducationComponent } from './components/education/education';
import { ExtracurricularComponent } from './components/extracurricular/extracurricular';
import { ContactComponent } from './components/contact/contact';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    EducationComponent,
    ExtracurricularComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  private scrollHandler?: () => void;
  private holoMouseMoveHandler?: (e: MouseEvent) => void;
  private revealObserver?: IntersectionObserver;
  private resetTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollProgress();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.add('reveal-ready');
      this.initReveal();
      this.initHoloEffect();
    }
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.classList.remove('reveal-ready');
    if (this.scrollHandler) window.removeEventListener('scroll', this.scrollHandler);
    if (this.holoMouseMoveHandler) document.removeEventListener('mousemove', this.holoMouseMoveHandler);
    this.revealObserver?.disconnect();
    if (this.resetTimer) clearTimeout(this.resetTimer);
  }

  initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    this.scrollHandler = () => {
      if (!bar) return;
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', this.scrollHandler);
  }

  initHoloEffect() {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    let active: HTMLElement | null = null;
    const resetCard = (card: HTMLElement) => {
      card.classList.remove('holo-active');
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.transform = '';
      if (this.resetTimer) clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => {
        card.style.transition = '';
        card.style.removeProperty('--holo-x');
        card.style.removeProperty('--holo-y');
      }, 500);
    };

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    this.holoMouseMoveHandler = (e: MouseEvent) => {
      if (isDark()) {
        if (active) { resetCard(active); active = null; }
        return;
      }

      const card = (e.target as HTMLElement).closest('.glass-card') as HTMLElement | null;

      if (active && active !== card) resetCard(active);
      active = card;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotX = (y - 0.5) * -14;
      const rotY = (x - 0.5) * 14;

      card.style.transition = '';
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      card.style.setProperty('--holo-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--holo-y', `${(y * 100).toFixed(1)}%`);
      card.classList.add('holo-active');
    };
    document.addEventListener('mousemove', this.holoMouseMoveHandler);
  }

  initReveal() {
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          this.revealObserver?.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => this.revealObserver?.observe(el));
  }
}
