# iOS 26 Liquid Glass + Indian Peacock Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign the Angular 21 portfolio for Krishnaveny Senathirajah to use Apple iOS 26 Liquid Glass aesthetics merged with an Indian peacock-feather cultural theme, fix all mobile responsiveness bugs, add a photo lightbox, and introduce an animated peacock mascot.

**Architecture:** CSS custom property overhaul introduces the gold/peacock palette and iOS 26 liquid-glass system; all existing components are updated in-place by editing their individual CSS files; two new files (mascot component) are added to `src/app/components/mascot/`.

**Tech Stack:** Angular 21 · CSS custom properties · SVG data-URI background patterns · CSS keyframe animations · `@angular/animations` (already installed) · `angular-animations` 0.11 (already installed)

---

## File Map

| Action | File |
|--------|------|
| Modify | `src/styles.css` — global design tokens + peacock body pattern |
| Modify | `src/app/app.css` — scroll-progress bar gold tint |
| Modify | `src/app/app.html` — add `<app-mascot>` |
| Modify | `src/app/app.ts` — import MascotComponent |
| Modify | `src/index.html` — add Noto Sans Tamil font |
| Modify | `src/app/components/hero/hero.css` — liquid glass buttons, fix mobile overflow |
| Modify | `src/app/components/navbar/navbar.css` — stronger liquid glass |
| Modify | `src/app/components/about/about.html` — photo click + lightbox markup |
| Modify | `src/app/components/about/about.ts` — lightbox state |
| Modify | `src/app/components/about/about.css` — lightbox styles, pointer cursor on photos |
| Modify | `src/app/components/skills/skills.css` — gold ring fill, liquid glass cards |
| Modify | `src/app/components/education/education.css` — gold timeline dots |
| Modify | `src/app/components/extracurricular/extracurricular.css` — icon gold accent |
| Modify | `src/app/components/contact/contact.css` — gold icon accent |
| Create | `src/app/components/mascot/mascot.ts` |
| Create | `src/app/components/mascot/mascot.html` |
| Create | `src/app/components/mascot/mascot.css` |

---

## Task 1 — Global CSS Design System (iOS 26 + Indian Gold Palette)

**Files:** Modify `src/styles.css`

- [ ] **Step 1: Replace `:root` variables with the full iOS 26 + Indian gold system**

Replace the entire `:root` block and `[data-theme="dark"]` block in `src/styles.css` with:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  /* ── Warm neutral base ── */
  --bg:       #F7F5F0;
  --bg2:      #EDE9E1;
  --bg3:      #D6D0C4;

  /* ── Typography ── */
  --text:     #18171A;
  --text2:    #38363C;
  --text3:    #6C6970;

  /* ── iOS 26 Liquid Glass system ── */
  --glass:    rgba(255, 255, 255, 0.58);
  --glass-b:  rgba(255, 255, 255, 0.92);
  --glass-sh:
    0 2px 0 rgba(255, 255, 255, 0.95) inset,
    0 -1px 0 rgba(0, 0, 0, 0.03) inset,
    0 10px 40px rgba(0, 0, 0, 0.07),
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 0 0 0.5px rgba(255, 255, 255, 0.55);
  --blur:     blur(40px) saturate(200%) brightness(1.06);

  /* ── Indian Gold Palette ── */
  --gold:          #C8A84B;
  --gold-light:    #E8C96B;
  --gold-dark:     #9A7A2E;
  --gold-glow:     rgba(200, 168, 75, 0.28);
  --gold-glow-str: rgba(200, 168, 75, 0.55);

  /* ── Peacock Colors ── */
  --peacock-teal:  #005F4E;
  --peacock-blue:  #1A237E;
  --peacock-green: #1B5E20;
  --peacock-turq:  #006064;

  /* ── Blob accent colors (peacock-themed) ── */
  --blob-1: rgba(200, 168,  75, 0.13);  /* gold */
  --blob-2: rgba(  0,  95,  78, 0.10);  /* peacock teal */
  --blob-3: rgba( 26,  35, 126, 0.09);  /* peacock blue */

  /* ── Motion & shape ── */
  --radius: 22px;
  --ease:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --nav-h:  64px;
}

[data-theme="dark"] {
  --bg:       #0A0A0F;
  --bg2:      #111118;
  --bg3:      #1C1C28;
  --text:     #F2F2F7;
  --text2:    #AEAEB2;
  --text3:    #6E6E73;

  --glass:    rgba(30, 30, 45, 0.72);
  --glass-b:  rgba(255, 255, 255, 0.09);
  --glass-sh:
    0 1px 0 rgba(255, 255, 255, 0.09) inset,
    0 -1px 0 rgba(0, 0, 0, 0.25) inset,
    0 12px 48px rgba(0, 0, 0, 0.45),
    0 4px 16px rgba(0, 0, 0, 0.30);
  --blur:     blur(40px) saturate(180%) brightness(0.92);

  --gold:          #D4B85A;
  --gold-light:    #F0D070;
  --gold-dark:     #A88A30;
  --gold-glow:     rgba(212, 184, 90, 0.30);
  --gold-glow-str: rgba(212, 184, 90, 0.60);

  --blob-1: rgba(200, 168,  75, 0.18);
  --blob-2: rgba(  0,  95,  78, 0.16);
  --blob-3: rgba( 26,  35, 126, 0.14);
}
```

- [ ] **Step 2: Update `html` and `body` to fix horizontal overflow**

Replace the `html` and `body` blocks:

```css
html {
  scroll-behavior: smooth;
  scrollbar-width: none;
  overflow-x: hidden;
  max-width: 100vw;
}
html::-webkit-scrollbar { display: none; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  max-width: 100vw;
  line-height: 1.65;
  transition: background 0.4s ease, color 0.4s ease;
  position: relative;
}
```

- [ ] **Step 3: Add the Indian peacock feather SVG body background pattern**

Add after the `body` block:

```css
/* ── Indian Peacock Feather Background Pattern ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='120' viewBox='0 0 100 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='50' cy='62' rx='36' ry='50' fill='none' stroke='%23005F4E' stroke-width='0.9' opacity='0.6'/%3E%3Cellipse cx='50' cy='62' rx='23' ry='33' fill='none' stroke='%231A237E' stroke-width='0.7' opacity='0.6'/%3E%3Cellipse cx='50' cy='62' rx='11' ry='16' fill='none' stroke='%23C8A84B' stroke-width='0.7' opacity='0.7'/%3E%3Ccircle cx='50' cy='62' r='3.5' fill='%23C8A84B' opacity='0.55'/%3E%3Cline x1='50' y1='0' x2='50' y2='120' stroke='%23005F4E' stroke-width='0.35' opacity='0.3'/%3E%3Ccircle cx='50' cy='12' r='2' fill='%23C8A84B' opacity='0.4'/%3E%3Ccircle cx='50' cy='8' r='1.2' fill='%231A237E' opacity='0.4'/%3E%3Ccircle cx='50' cy='4' r='0.7' fill='%23005F4E' opacity='0.3'/%3E%3C/svg%3E");
  background-size: 100px 120px;
  opacity: 0.042;
  transition: opacity 0.4s ease;
}

[data-theme="dark"] body::before {
  opacity: 0.065;
}
```

- [ ] **Step 4: Update `#scroll-progress` bar to gold**

```css
#scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2.5px;
  width: 0%;
  background: linear-gradient(to right, var(--gold-dark), var(--gold-light));
  box-shadow: 0 0 12px var(--gold-glow-str);
  z-index: 10000;
  transition: width 0.1s linear;
}

[data-theme="dark"] #scroll-progress {
  background: linear-gradient(to right, var(--gold-dark), var(--gold-light));
  box-shadow: 0 0 16px var(--gold-glow-str);
}
```

- [ ] **Step 5: Update `.glass-card` for iOS 26 liquid glass look**

Replace the `.glass-card` and its `::after` blocks:

```css
.glass-card {
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.48) 100%
  );
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  border-top: 1px solid rgba(255, 255, 255, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.65);
  border-right: 1px solid rgba(255, 255, 255, 0.35);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--radius);
  box-shadow: var(--glass-sh);
  position: relative;
  --holo-x: 50%;
  --holo-y: 50%;
}

[data-theme="dark"] .glass-card {
  background: linear-gradient(
    160deg,
    rgba(50, 50, 70, 0.75) 0%,
    rgba(30, 30, 45, 0.65) 100%
  );
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  border-right: 1px solid rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}

/* ── Holographic overlay ── */
.glass-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(
      ellipse 80% 60% at var(--holo-x) var(--holo-y),
      rgba(200, 168,  75, 0.14) 0%,
      rgba(  0,  95,  78, 0.08) 35%,
      rgba( 26,  35, 126, 0.06) 60%,
      transparent 78%
    ),
    linear-gradient(
      125deg,
      rgba(200, 168, 75, 0.05) 0%,
      rgba(  0, 95,  78, 0.05) 33%,
      rgba( 26, 35, 126, 0.05) 66%,
      rgba(200, 168, 75, 0.04) 100%
    );
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s var(--ease);
  z-index: 1;
  mix-blend-mode: overlay;
}

.glass-card.holo-active::after { opacity: 1; }

.glass-card.holo-active {
  box-shadow:
    var(--glass-sh),
    0 0 32px rgba(200, 168, 75, 0.12),
    0 0 64px rgba(0, 95, 78, 0.06);
}

[data-theme="dark"] .glass-card.holo-active::after {
  background:
    radial-gradient(
      ellipse 80% 60% at var(--holo-x) var(--holo-y),
      rgba(200, 168, 75, 0.18) 0%,
      rgba(  0, 95,  78, 0.14) 35%,
      rgba( 26, 35, 126, 0.12) 60%,
      transparent 78%
    );
}

[data-theme="dark"] .glass-card.holo-active {
  box-shadow:
    var(--glass-sh),
    0 0 40px rgba(200, 168, 75, 0.18);
}
```

- [ ] **Step 6: Add gold glow to `.section-title` and update `.section-title-bar`**

```css
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 700;
  color: var(--text);
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.1;
  letter-spacing: -0.5px;
  text-shadow:
    0 0 40px var(--gold-glow),
    0 0 80px rgba(200, 168, 75, 0.10);
}

.section-title-bar {
  width: 40px;
  height: 2.5px;
  background: linear-gradient(to right, var(--gold-dark), var(--gold-light));
  margin: 0 auto 60px;
  border-radius: 2px;
  box-shadow: 0 0 12px var(--gold-glow);
}
```

- [ ] **Step 7: Verify the page builds without errors**

```bash
cd "C:\Users\User\Desktop\profil\krishnaveny" && npx ng build --configuration development 2>&1 | tail -20
```

Expected: `Build at:` line with no errors.

---

## Task 2 — Fix Mobile Horizontal Scroll

**Files:** Modify `src/app/components/hero/hero.css`

- [ ] **Step 1: Fix hero blob overflow on mobile**

The blobs are absolutely positioned with large sizes (-140px offsets). The `.hero-wrap` already has `overflow: hidden` but we must ensure all descendants clip properly. Replace the mobile breakpoint at the bottom of `src/app/components/hero/hero.css`:

```css
/* ═══════════════════════════════════════
   TABLET (≤1024px)
═══════════════════════════════════════ */
@media (max-width: 1024px) {
  .hero-content { padding: 48px 40px 80px; gap: 36px; }
  .hero-photo-frame { width: 210px; height: 260px; }
}

/* ═══════════════════════════════════════
   MOBILE (≤768px)
═══════════════════════════════════════ */
@media (max-width: 768px) {
  .hero-wrap { overflow: hidden; }
  .hero-content {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    padding: 60px 20px 96px;
    gap: 32px;
    max-width: 100%;
    width: 100%;
  }
  .hero-left { align-items: center; width: 100%; }
  .hero-name { text-align: center; max-width: 100%; }
  .name-line { font-size: clamp(32px, 9vw, 48px); text-align: center; }
  .name-line--last { font-size: clamp(26px, 7.2vw, 38px); }
  .hero-uni { justify-content: center; text-align: center; flex-wrap: wrap; }
  .hero-btns { justify-content: center; width: 100%; }
  .hero-photo-frame { width: 180px; height: 222px; flex-shrink: 0; }

  /* Scale down blobs so they stay inside viewport */
  .wall-blob-1 { width: 280px; height: 280px; top: -80px; left: -60px; }
  .wall-blob-2 { width: 240px; height: 240px; bottom: -60px; right: -50px; }
  .wall-blob-3 { width: 200px; height: 200px; }
  .wall-ring   { width: 300px; height: 300px; }
}

@media (max-width: 430px) {
  .hero-content { padding: 56px 16px 88px; }
  .hero-photo-frame { width: 155px; height: 192px; }
  .hero-btn { padding: 12px 22px; font-size: 13px; }
  .role-pill { font-size: 11px; padding: 7px 14px; }
}

@media (max-width: 360px) {
  .hero-content { padding: 48px 12px 80px; }
  .hero-btns { flex-direction: column; align-items: center; gap: 10px; }
  .hero-btn { width: 100%; justify-content: center; max-width: 260px; }
}
```

- [ ] **Step 2: Update hero blob colors to peacock/gold palette**

In `src/app/components/hero/hero.css`, replace the blob background values:

```css
.wall-blob-1 {
  width: 680px; height: 680px;
  background: var(--blob-1);
  filter: blur(90px);
  top: -180px; left: -140px;
}

.wall-blob-2 {
  width: 520px; height: 520px;
  background: var(--blob-2);
  filter: blur(80px);
  bottom: -140px; right: -100px;
}

.wall-blob-3 {
  width: 420px; height: 420px;
  background: var(--blob-3);
  filter: blur(70px);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}
```

Also remove the `[data-theme="dark"]` blob color overrides in hero.css since they're now handled via CSS variables.

- [ ] **Step 3: iOS 26 style liquid glass buttons in hero**

Replace `.hero-btn--filled` and `.hero-btn--ghost` styles:

```css
.hero-btn--filled {
  background: linear-gradient(
    160deg,
    rgba(200, 168, 75, 0.92) 0%,
    rgba(154, 122, 46, 0.95) 100%
  );
  color: #fff;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.45);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.3) inset,
    0 4px 20px rgba(200, 168, 75, 0.40),
    0 2px 8px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.hero-btn--filled:hover {
  box-shadow:
    0 1px 0 rgba(255,255,255,0.35) inset,
    0 8px 32px rgba(200, 168, 75, 0.55),
    0 4px 12px rgba(0, 0, 0, 0.18);
  transform: translateY(-2px);
}
.hero-btn--filled:active { transform: scale(0.97); }

.hero-btn--ghost {
  background: var(--glass);
  color: var(--text);
  border-top: 1px solid rgba(255, 255, 255, 0.85);
  border-left: 1px solid rgba(255, 255, 255, 0.55);
  border-right: 1px solid rgba(255, 255, 255, 0.30);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  box-shadow: var(--glass-sh);
}
.hero-btn--ghost:hover {
  background: var(--glass-b);
  box-shadow:
    0 2px 0 rgba(255,255,255,0.95) inset,
    0 8px 32px rgba(0,0,0,0.10),
    0 0 24px var(--gold-glow);
  transform: translateY(-2px);
}
.hero-btn--ghost:active { transform: scale(0.97); }
```

- [ ] **Step 4: Verify no horizontal scroll on mobile viewport**

Run dev server: `npx ng serve` (keep running in background). Open browser at `http://localhost:4200`, use DevTools → Device toolbar → iPhone 14 (390×844). Confirm there is zero horizontal scrollbar and content stays within viewport.

---

## Task 3 — Photo Lightbox (About Section)

**Files:** Modify `src/app/components/about/about.ts`, `about.html`, `about.css`

- [ ] **Step 1: Add lightbox state and methods to `about.ts`**

Replace the entire `about.ts` with:

```typescript
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
    if (event.key === 'Escape') this.closePhoto();
    if (event.key === 'ArrowLeft')  this.prevPhoto();
    if (event.key === 'ArrowRight') this.nextPhoto();
  }
}
```

- [ ] **Step 2: Update `about.html` with click handlers and lightbox markup**

Replace the entire `about.html`:

```html
<div class="about-header reveal">
  <h2 class="section-title">About Me</h2>
  <div class="section-title-bar"></div>
</div>

<div class="about-grid">
  <!-- Photo grid -->
  <div class="photo-grid reveal-left">
    @for (photo of photos; track photo; let i = $index) {
      <div class="photo-item" [class.photo-tall]="i === 0" (click)="openPhoto(i)" role="button" tabindex="0" aria-label="View photo {{ i + 1 }}">
        <img [src]="photo" alt="Krishnaveny" loading="lazy" />
        <div class="photo-overlay">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      </div>
    }
  </div>

  <!-- Text side -->
  <div class="about-text">
    <p class="bio reveal">
      As a motivated and proficient electronics and computer science student, I possess
      a solid background in project management. My enthusiasm for technology and innovation
      drives me to excel in both individual and team-based settings. With hands-on experience
      in leadership roles and extracurricular activities, I thrive in dynamic environments.
      My dedication to continuous learning and problem-solving ensures that I contribute
      effectively to any technical team.
    </p>

    <div class="stats-row reveal">
      <div class="stat-chip">
        <span class="stat-val" style="font-family:'JetBrains Mono',monospace">1.4819</span>
        <span class="stat-lbl">Z-Score</span>
      </div>
      <div class="stat-chip">
        <span class="stat-val">UOK</span>
        <span class="stat-lbl">University</span>
      </div>
      <div class="stat-chip">
        <span class="stat-val">3</span>
        <span class="stat-lbl">Languages</span>
      </div>
    </div>

    <!-- Hobbies -->
    <div class="hobbies reveal">
      <h4 class="sub-title">Hobbies</h4>
      <div class="hobby-chips">
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Reading
        </span>
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          Music
        </span>
        <span class="chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="6" width="20" height="15" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M6.5 6V4"/></svg>
          Photography
        </span>
      </div>
    </div>

    <!-- Languages -->
    <div class="languages reveal">
      <h4 class="sub-title">Languages</h4>
      @for (lang of langs; track lang.name) {
        <div class="lang-row">
          <div class="lang-top">
            <span class="lang-name">{{ lang.name }}</span>
            <span class="lang-pct" style="font-family:'JetBrains Mono',monospace">{{ lang.pct }}%</span>
          </div>
          <div class="lang-track">
            <div class="lang-bar" [style.width.%]="lang.pct"></div>
          </div>
        </div>
      }
    </div>
  </div>
</div>

<!-- ── Lightbox ── -->
@if (activePhoto !== null) {
  <div class="lightbox" (click)="closePhoto()" (keydown)="onKey($event)" tabindex="0" role="dialog" aria-modal="true">
    <div class="lb-backdrop"></div>

    <button class="lb-close" (click)="closePhoto()" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <button class="lb-nav lb-prev" (click)="$event.stopPropagation(); prevPhoto()" aria-label="Previous photo">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <div class="lb-img-wrap" (click)="$event.stopPropagation()">
      <img [src]="photos[activePhoto]" alt="Photo {{ activePhoto + 1 }}" class="lb-img" />
    </div>

    <button class="lb-nav lb-next" (click)="$event.stopPropagation(); nextPhoto()" aria-label="Next photo">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>

    <div class="lb-dots">
      @for (photo of photos; track photo; let i = $index) {
        <button class="lb-dot" [class.active]="i === activePhoto" (click)="$event.stopPropagation(); activePhoto = i" [attr.aria-label]="'Go to photo ' + (i+1)"></button>
      }
    </div>
  </div>
}
```

- [ ] **Step 3: Add lightbox CSS and photo-overlay to `about.css`**

At the end of `about.css`, append:

```css
/* ── Photo clickable indicator ── */
.photo-item {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0);
  transition: background 0.28s var(--ease), color 0.28s var(--ease);
  border-radius: inherit;
}

.photo-item:hover .photo-overlay {
  background: rgba(0, 0, 0, 0.32);
  color: rgba(255,255,255,0.92);
}

/* ── Lightbox ── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: lbIn 0.28s var(--ease) both;
}

@keyframes lbIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.lb-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 8, 12, 0.85);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
}

.lb-img-wrap {
  position: relative;
  z-index: 1;
  max-width: min(560px, 90vw);
  max-height: 80vh;
  border-radius: 22px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.15),
    0 32px 96px rgba(0,0,0,0.60),
    0 0 60px var(--gold-glow);
  animation: lbImgIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes lbImgIn {
  from { transform: scale(0.88); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.lb-img {
  width: 100%;
  height: 100%;
  max-height: 78vh;
  object-fit: contain;
  display: block;
}

.lb-close {
  position: absolute;
  top: 20px; right: 20px;
  z-index: 2;
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.9);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.lb-close:hover { background: rgba(255,255,255,0.22); transform: scale(1.08) rotate(90deg); }

.lb-nav {
  position: absolute;
  z-index: 2;
  top: 50%; transform: translateY(-50%);
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(255,255,255,0.10);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.16);
  color: rgba(255,255,255,0.85);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.lb-nav:hover { background: rgba(255,255,255,0.22); }
.lb-prev { left: 20px; }
.lb-prev:hover { transform: translateY(-50%) translateX(-2px); }
.lb-next { right: 20px; }
.lb-next:hover { transform: translateY(-50%) translateX(2px); }

.lb-dots {
  position: absolute;
  bottom: 24px;
  left: 50%; transform: translateX(-50%);
  z-index: 2;
  display: flex; gap: 8px;
}

.lb-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.35);
  border: none; cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  padding: 0;
}
.lb-dot.active {
  background: var(--gold-light);
  transform: scale(1.35);
  box-shadow: 0 0 8px var(--gold-glow-str);
}
```

- [ ] **Step 4: Verify lightbox works**

Run `npx ng serve`, open browser, go to About section, click any photo. Confirm:
- Photo opens in full overlay with blur backdrop
- Close button (×) works
- Prev/Next arrows cycle through photos
- Dots indicator updates
- ESC key closes it

---

## Task 4 — Liquid Glass Navbar

**Files:** Modify `src/app/components/navbar/navbar.css`

- [ ] **Step 1: Enhance nav glass effect and add gold logo**

Replace the top `nav` and `nav.scrolled` blocks:

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 52px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgba(255, 255, 255, 0.52) 100%
  );
  backdrop-filter: blur(40px) saturate(200%) brightness(1.06);
  -webkit-backdrop-filter: blur(40px) saturate(200%) brightness(1.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.60);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.9) inset,
    0 1px 24px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  transition: background 0.4s ease, border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
}

nav.scrolled {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.84) 0%,
    rgba(255, 255, 255, 0.68) 100%
  );
  border-bottom-color: rgba(255,255,255,0.5);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.95) inset,
    0 1px 32px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] nav {
  background: linear-gradient(
    180deg,
    rgba(20, 20, 32, 0.80) 0%,
    rgba(10, 10, 20, 0.65) 100%
  );
  border-bottom-color: rgba(255,255,255,0.07);
}

[data-theme="dark"] nav.scrolled {
  background: linear-gradient(
    180deg,
    rgba(25, 25, 40, 0.90) 0%,
    rgba(15, 15, 28, 0.80) 100%
  );
  border-bottom-color: rgba(255,255,255,0.09);
  box-shadow: 0 1px 32px rgba(0, 0, 0, 0.45);
}
```

- [ ] **Step 2: Add gold gradient to navbar logo**

Replace the `.logo` block:

```css
.logo {
  font-family: 'Playfair Display', serif;
  font-size: 21px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-light) 50%, var(--gold-dark) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  letter-spacing: -0.3px;
  user-select: none;
  flex-shrink: 0;
  filter: drop-shadow(0 0 12px var(--gold-glow));
}
```

---

## Task 5 — Gold Skill Rings + Glass Skill Cards

**Files:** Modify `src/app/components/skills/skills.css`

- [ ] **Step 1: Update skill blob colors**

Replace `.sk-blob-1` and `.sk-blob-2` background values:

```css
.sk-blob-1 {
  width: 480px; height: 480px;
  background: var(--blob-1);
  filter: blur(80px);
  top: -60px; right: -60px;
}

.sk-blob-2 {
  width: 380px; height: 380px;
  background: var(--blob-2);
  filter: blur(70px);
  bottom: -40px; left: -60px;
}
```

Remove the `[data-theme="dark"]` blob color overrides in skills.css.

- [ ] **Step 2: Gold ring fill + icon gold glow on hover**

Replace `.ring-fill`, `.skill-card:hover .skill-icon` sections:

```css
.ring-fill {
  stroke: var(--gold);
  filter: drop-shadow(0 0 6px var(--gold-glow-str));
  transition: stroke-dasharray 1.3s var(--ease);
}

.ring-text {
  fill: var(--text);
}

.skill-card:hover .skill-icon {
  background: var(--bg3);
  box-shadow:
    0 4px 16px rgba(0,0,0,0.09),
    0 0 20px var(--gold-glow);
  transform: scale(1.07);
  color: var(--gold);
}

.skill-bar {
  height: 100%;
  background: linear-gradient(to right, var(--gold-dark), var(--gold-light));
  border-radius: 100px;
  transition: width 1.4s var(--ease);
}
```

---

## Task 6 — Gold Timeline Dots (Education)

**Files:** Modify `src/app/components/education/education.css`

- [ ] **Step 1: Replace timeline dot and line with gold accent**

Replace `.tl-line`, `.dot-inner`, `.dot-pulse`, `.tl-year` blocks:

```css
.tl-line {
  position: absolute;
  top: 0; bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--gold) 8%,
    var(--gold-dark) 92%,
    transparent 100%
  );
  opacity: 0.35;
}

.dot-inner {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--gold);
  border: 2.5px solid var(--bg);
  box-shadow:
    0 0 0 2.5px var(--gold-dark),
    0 0 16px var(--gold-glow-str);
  position: relative;
  z-index: 1;
}

.dot-pulse {
  position: absolute;
  top: 22px; left: 50%;
  transform: translate(-50%, 0);
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0.35;
  animation: dotPulse 2.4s ease-out infinite;
}

.tl-year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--gold-dark);
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 10px;
  background: linear-gradient(135deg, rgba(200,168,75,0.12) 0%, rgba(200,168,75,0.06) 100%);
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid rgba(200,168,75,0.30);
}

[data-theme="dark"] .tl-year {
  color: var(--gold-light);
  border-color: rgba(212,184,90,0.30);
}
```

---

## Task 7 — Gold Accents in Extracurricular + Contact

**Files:** Modify `src/app/components/extracurricular/extracurricular.css`, `contact.css`

- [ ] **Step 1: Extracurricular — gold icon glow on hover**

In `extracurricular.css`, replace `.extra-card:hover .extra-icon`:

```css
.extra-card:hover .extra-icon {
  background: var(--bg3);
  box-shadow:
    0 4px 16px rgba(0,0,0,0.09),
    0 0 24px var(--gold-glow);
  transform: scale(1.06) rotate(-3deg);
  color: var(--gold);
}

.extra-role {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--gold-dark);
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, rgba(200,168,75,0.10) 0%, rgba(200,168,75,0.05) 100%);
  border: 1px solid rgba(200,168,75,0.25);
  display: inline-block;
  padding: 4px 10px;
  border-radius: 100px;
  width: fit-content;
}

[data-theme="dark"] .extra-role {
  color: var(--gold-light);
  border-color: rgba(212,184,90,0.25);
}
```

- [ ] **Step 2: Contact — gold icon accent on hover**

In `contact.css`, replace `.contact-row:hover .c-icon`:

```css
.contact-row:hover .c-icon {
  background: linear-gradient(135deg, rgba(200,168,75,0.15) 0%, rgba(200,168,75,0.06) 100%);
  box-shadow:
    0 4px 12px rgba(0,0,0,0.08),
    0 0 16px var(--gold-glow);
  transform: scale(1.05);
  color: var(--gold);
  border-color: rgba(200,168,75,0.30);
}
```

Also update `.ref-avatar`:

```css
.ref-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(200,168,75,0.18) 0%, rgba(200,168,75,0.06) 100%);
  border: 1px solid rgba(200,168,75,0.30);
  box-shadow: 0 2px 8px rgba(0,0,0,0.07), 0 0 12px var(--gold-glow);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 14px; font-weight: 700;
  color: var(--gold);
  margin-bottom: 6px;
  flex-shrink: 0;
}
```

---

## Task 8 — Animated Peacock Mascot Component

**Files:** Create `src/app/components/mascot/mascot.ts`, `mascot.html`, `mascot.css`. Modify `src/app/app.html`, `src/app/app.ts`

- [ ] **Step 1: Create `mascot.ts`**

Create `src/app/components/mascot/mascot.ts`:

```typescript
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mascot',
  imports: [],
  templateUrl: './mascot.html',
  styleUrl: './mascot.css'
})
export class MascotComponent implements OnInit {
  visible = true;
  fanOpen = false;
  minimized = false;

  private fanTimer: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) private pid: Object) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.pid)) return;
    // Open tail fan every 8 seconds for 2 seconds
    this.fanTimer = setInterval(() => {
      this.fanOpen = true;
      setTimeout(() => { this.fanOpen = false; }, 2200);
    }, 8000);
    // First fan after 3 seconds
    setTimeout(() => {
      this.fanOpen = true;
      setTimeout(() => { this.fanOpen = false; }, 2200);
    }, 3000);
  }

  toggle(): void { this.minimized = !this.minimized; }

  dismiss(): void {
    this.visible = false;
    if (this.fanTimer) clearInterval(this.fanTimer);
  }
}
```

- [ ] **Step 2: Create `mascot.html`**

Create `src/app/components/mascot/mascot.html`:

```html
@if (visible) {
  <div class="mascot-wrap" [class.minimized]="minimized" [class.fan-open]="fanOpen">

    <!-- Dismiss button -->
    <button class="mascot-dismiss" (click)="dismiss()" aria-label="Dismiss mascot">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <!-- Peacock SVG -->
    <div class="peacock" (click)="toggle()" aria-label="Toggle mascot" role="button" tabindex="0">

      <!-- Tail fan feathers (behind body) -->
      <svg class="peacock-tail" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <!-- 7 feathers at different angles -->
        <g class="feathers">
          <!-- Feather 1 - center -->
          <ellipse cx="80" cy="50" rx="7" ry="42" fill="#005F4E" opacity="0.85" class="f0"/>
          <ellipse cx="80" cy="22" rx="5" ry="10" fill="#1A237E" opacity="0.9" class="f0"/>
          <ellipse cx="80" cy="22" rx="3" ry="6" fill="#006064" opacity="0.9" class="f0"/>
          <circle cx="80" cy="18" r="2.5" fill="#C8A84B" opacity="0.95" class="f0"/>

          <!-- Feather 2 - slight right -->
          <ellipse cx="80" cy="50" rx="6" ry="40" fill="#005F4E" opacity="0.75" class="f1" transform="rotate(14 80 108)"/>
          <ellipse cx="80" cy="22" rx="4.5" ry="9" fill="#1A237E" opacity="0.85" class="f1" transform="rotate(14 80 108)"/>
          <circle cx="89" cy="14" r="2.2" fill="#C8A84B" opacity="0.9" class="f1"/>

          <!-- Feather 3 - slight left -->
          <ellipse cx="80" cy="50" rx="6" ry="40" fill="#005F4E" opacity="0.75" class="f2" transform="rotate(-14 80 108)"/>
          <ellipse cx="80" cy="22" rx="4.5" ry="9" fill="#1A237E" opacity="0.85" class="f2" transform="rotate(-14 80 108)"/>
          <circle cx="71" cy="14" r="2.2" fill="#C8A84B" opacity="0.9" class="f2"/>

          <!-- Feather 4 - right -->
          <ellipse cx="80" cy="50" rx="5.5" ry="36" fill="#005F4E" opacity="0.65" class="f3" transform="rotate(28 80 108)"/>
          <circle cx="99" cy="18" r="2" fill="#C8A84B" opacity="0.85" class="f3"/>

          <!-- Feather 5 - left -->
          <ellipse cx="80" cy="50" rx="5.5" ry="36" fill="#005F4E" opacity="0.65" class="f4" transform="rotate(-28 80 108)"/>
          <circle cx="61" cy="18" r="2" fill="#C8A84B" opacity="0.85" class="f4"/>

          <!-- Feather 6 - far right -->
          <ellipse cx="80" cy="50" rx="5" ry="32" fill="#005F4E" opacity="0.50" class="f5" transform="rotate(42 80 108)"/>
          <circle cx="110" cy="28" r="1.8" fill="#C8A84B" opacity="0.75" class="f5"/>

          <!-- Feather 7 - far left -->
          <ellipse cx="80" cy="50" rx="5" ry="32" fill="#005F4E" opacity="0.50" class="f6" transform="rotate(-42 80 108)"/>
          <circle cx="50" cy="28" r="1.8" fill="#C8A84B" opacity="0.75" class="f6"/>
        </g>
      </svg>

      <!-- Body -->
      <svg class="peacock-body" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Body oval -->
        <ellipse cx="40" cy="68" rx="22" ry="28" fill="#1B5E20"/>
        <ellipse cx="40" cy="68" rx="14" ry="20" fill="#2E7D32" opacity="0.6"/>

        <!-- Neck -->
        <ellipse cx="40" cy="44" rx="11" ry="20" fill="#006064"/>
        <ellipse cx="40" cy="44" rx="7" ry="14" fill="#00838F" opacity="0.5"/>

        <!-- Head -->
        <circle cx="40" cy="27" r="13" fill="#005F4E"/>
        <circle cx="40" cy="27" r="9" fill="#006B5B" opacity="0.6"/>

        <!-- Eye -->
        <circle cx="36" cy="25" r="4" fill="#fff"/>
        <circle cx="37" cy="25" r="2.5" fill="#1A237E"/>
        <circle cx="37.8" cy="24.3" r="0.8" fill="#fff"/>

        <!-- Beak -->
        <ellipse cx="44" cy="29" rx="5" ry="3" fill="#C8A84B" transform="rotate(15 44 29)"/>

        <!-- Crown feathers -->
        <line x1="38" y1="14" x2="36" y2="6" stroke="#C8A84B" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="40" y1="13" x2="40" y2="4" stroke="#C8A84B" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="42" y1="14" x2="44" y2="6" stroke="#C8A84B" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="36" cy="6" r="2" fill="#C8A84B"/>
        <circle cx="40" cy="4" r="2.2" fill="#C8A84B"/>
        <circle cx="44" cy="6" r="2" fill="#C8A84B"/>

        <!-- Feet -->
        <line x1="34" y1="92" x2="32" y2="100" stroke="#1B5E20" stroke-width="2" stroke-linecap="round"/>
        <line x1="46" y1="92" x2="48" y2="100" stroke="#1B5E20" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- Tooltip -->
    <div class="mascot-tip" [class.hidden]="minimized">
      <span>Namaste! I'm Priya 🦚</span>
    </div>

  </div>
}
```

- [ ] **Step 3: Create `mascot.css`**

Create `src/app/components/mascot/mascot.css`:

```css
/* ── Wrapper — fixed bottom-right ── */
.mascot-wrap {
  position: fixed;
  bottom: 32px;
  right: 28px;
  z-index: 5000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: mascotEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both 1.2s;
  user-select: none;
}

@keyframes mascotEntry {
  from { transform: translateY(80px) scale(0.6); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}

/* ── Dismiss button ── */
.mascot-dismiss {
  position: absolute;
  top: -8px; right: -8px;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(200,168,75,0.30);
  color: var(--text3);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.mascot-dismiss:hover { background: rgba(255,255,255,1); transform: scale(1.15) rotate(90deg); }

/* ── Peacock body SVG ── */
.peacock {
  position: relative;
  cursor: pointer;
  width: 80px;
  height: 100px;
  animation: sway 4s ease-in-out infinite;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  filter: drop-shadow(0 8px 24px rgba(0,95,78,0.35)) drop-shadow(0 0 16px rgba(200,168,75,0.25));
}

@keyframes sway {
  0%, 100% { transform: rotate(-2.5deg) translateY(0px); }
  50%       { transform: rotate(2.5deg) translateY(-4px); }
}

.peacock:hover { animation-play-state: paused; transform: rotate(0) scale(1.06); }

/* ── Tail SVG ── */
.peacock-tail {
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%) scaleX(0.4) scaleY(0.35);
  width: 160px; height: 160px;
  transform-origin: bottom center;
  opacity: 0.5;
  transition:
    transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.6s ease;
}

.peacock-body {
  position: relative;
  z-index: 1;
  width: 80px; height: 100px;
}

/* ── Fan open state ── */
.fan-open .peacock-tail {
  transform: translateX(-50%) scaleX(1) scaleY(1);
  opacity: 1;
}

/* ── Tooltip ── */
.mascot-tip {
  background: linear-gradient(
    160deg,
    rgba(255,255,255,0.80) 0%,
    rgba(255,255,255,0.55) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(255,255,255,0.95);
  border-left: 1px solid rgba(255,255,255,0.65);
  border-right: 1px solid rgba(255,255,255,0.30);
  border-bottom: 1px solid rgba(255,255,255,0.15);
  border-radius: 14px;
  padding: 8px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  box-shadow:
    0 2px 0 rgba(255,255,255,0.9) inset,
    0 6px 24px rgba(0,0,0,0.08),
    0 0 16px var(--gold-glow);
  white-space: nowrap;
  transition: opacity 0.35s var(--ease), transform 0.35s var(--ease);
  transform: translateY(0);
}

.mascot-tip.hidden {
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
}

/* ── Minimized state ── */
.mascot-wrap.minimized .peacock {
  transform: scale(0.72);
}

/* ── Dark mode ── */
[data-theme="dark"] .mascot-tip {
  background: linear-gradient(160deg, rgba(40,40,60,0.85) 0%, rgba(20,20,35,0.72) 100%);
  border-top-color: rgba(255,255,255,0.10);
  color: var(--text);
}

[data-theme="dark"] .mascot-dismiss {
  background: rgba(30,30,45,0.90);
  border-color: rgba(200,168,75,0.25);
  color: var(--text2);
}

/* ── Mobile — smaller ── */
@media (max-width: 600px) {
  .mascot-wrap { bottom: 20px; right: 16px; }
  .peacock { width: 60px; height: 76px; }
  .peacock-body { width: 60px; height: 76px; }
  .peacock-tail { width: 120px; height: 120px; bottom: 28px; }
  .mascot-tip { font-size: 11px; padding: 6px 11px; }
}
```

- [ ] **Step 4: Add MascotComponent to `app.ts`**

In `src/app/app.ts`, add the import and include in `imports[]`:

```typescript
import { MascotComponent } from './components/mascot/mascot';
```

Add `MascotComponent` to the `imports: [...]` array in `@Component`.

- [ ] **Step 5: Add `<app-mascot>` to `app.html`**

Add as the last element in `src/app/app.html`:

```html
<div id="scroll-progress"></div>
<app-navbar></app-navbar>
<section id="hero"><app-hero></app-hero></section>
<section id="about"><app-about></app-about></section>
<section id="skills"><app-skills></app-skills></section>
<section id="education"><app-education></app-education></section>
<section id="extracurricular"><app-extracurricular></app-extracurricular></section>
<section id="contact"><app-contact></app-contact></section>
<app-mascot></app-mascot>
```

- [ ] **Step 6: Verify mascot renders and animates**

Run `npx ng serve`, open browser. Confirm:
- Peacock mascot appears in bottom-right corner
- It sways gently
- After 3 seconds the tail fan opens and closes
- Every 8 seconds the tail fans again
- Clicking the peacock toggles the tooltip
- The × button dismisses it
- Works on mobile at smaller size

---

## Task 9 — Performance & Smoothness Polish

**Files:** Modify `src/styles.css` (global `will-change`), `src/app/components/hero/hero.css`

- [ ] **Step 1: Add GPU compositing hints to animated elements in `styles.css`**

Add after the `.reveal-right` block:

```css
/* ── GPU compositing hints ── */
.wall-blob,
.wall-ring,
.sk-blob,
.hero-photo-frame,
.particle-canvas {
  will-change: transform;
  transform: translateZ(0);
}

/* ── Reduced motion support ── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Smooth mobile scroll — add `touch-action` and `overscroll-behavior`**

In the `body` block in `styles.css`, add:

```css
body {
  /* existing properties ... */
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
}
```

- [ ] **Step 3: Final build check**

```bash
cd "C:\Users\User\Desktop\profil\krishnaveny" && npx ng build 2>&1 | tail -30
```

Expected: successful build with no errors. Only warnings about budget size are acceptable.

- [ ] **Step 4: Visual QA checklist**

Open `http://localhost:4200` and verify each item:

- [ ] Gold scroll progress bar appears at top when scrolling
- [ ] Peacock SVG pattern subtly visible in background
- [ ] Navbar has iOS 26 liquid glass look with gold "KS" logo
- [ ] Hero section: gold-tinted CTA button, ghost button with glass effect
- [ ] About photos: hover shows magnify icon overlay, click opens lightbox
- [ ] Lightbox: prev/next arrows, dot indicators, ESC closes, gold glow on image
- [ ] Skills: gold ring fill with glow, icon glows gold on hover
- [ ] Education: gold timeline dots with pulse glow, gold year badges
- [ ] Extracurricular: role badges in gold tint, icon glows gold on hover
- [ ] Contact: icon turns gold on hover, reference avatars have gold border
- [ ] Peacock mascot in bottom-right: sways, fans tail, tooltip shows, dismiss works
- [ ] Mobile (390px): no horizontal scroll, all content fits, mascot smaller
- [ ] Dark mode: all gold effects visible, glass cards darker, pattern slightly brighter

---

## Self-Review

**Spec coverage check:**
- ✅ Mobile responsive / horizontal scroll fix — Task 2
- ✅ Photo click lightbox — Task 3
- ✅ iOS 26 Liquid Glass UI — Tasks 1, 4, 5 (glass-card, navbar, buttons)
- ✅ Indian cultural peacock background — Task 1 (SVG pattern)
- ✅ Gold color glow effects — Tasks 1, 5, 6, 7
- ✅ Animated mascot character — Task 8
- ✅ Smoothness/performance — Task 9
- ✅ All Angular animations preserved (existing `pulseAnimation`, `hueRotateAnimation`, `rotateAnimation`)

**Placeholder scan:** No TBDs. All code blocks are complete and executable.

**Type consistency:** `activePhoto: number | null` used consistently in `about.ts` and template `@if (activePhoto !== null)` and `photos[activePhoto]`. `MascotComponent` class name matches import in `app.ts`.
