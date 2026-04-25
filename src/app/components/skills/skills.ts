import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent {
  skills = [
    { name: 'C Language',       pct: 70, icon: 'terminal' },
    { name: 'OOP Java',         pct: 65, icon: 'code'     },
    { name: 'Eagle PCB Design', pct: 60, icon: 'cpu'      },
    { name: 'Microsoft Office', pct: 90, icon: 'grid'     },
    { name: 'Web Designing',    pct: 75, icon: 'monitor'  },
  ];

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      terminal: 'M4 17l6-6-6-6M12 19h8',
      code:     'M16 18l6-6-6-6M8 6l-6 6 6 6',
      cpu:      'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
      grid:     'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
      monitor:  'M2 3h20v13H2zM8 21h8M12 17v4',
    };
    return icons[type] || icons['code'];
  }

  getCircle(pct: number) {
    const r = 36, c = 2 * Math.PI * r;
    return { dash: `${(pct / 100) * c} ${c}`, offset: c * 0.25 };
  }
}
