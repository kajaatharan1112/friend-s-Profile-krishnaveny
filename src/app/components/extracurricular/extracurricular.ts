import { Component } from '@angular/core';

@Component({
  selector: 'app-extracurricular',
  imports: [],
  templateUrl: './extracurricular.html',
  styleUrl: './extracurricular.css'
})
export class ExtracurricularComponent {
  cards = [
    {
      title: 'UOK Robot Battle 2025',
      role: 'Membership Team',
      desc: 'Participated in the University of Kelaniya Robot Battle as a core membership team member, collaborating on robotics design and engineering.',
      icon: 'robot'
    },
    {
      title: 'LEO Club',
      role: 'Editorial Unit Member',
      desc: 'Active member of the LEO Club Editorial Unit, contributing to content creation, communications, and club publications.',
      icon: 'users'
    },
    {
      title: 'School Prefect',
      role: 'J/Arunodaya College · 2019–2022',
      desc: 'Served as a school prefect demonstrating leadership, discipline, and responsibility within the school community for three years.',
      icon: 'award'
    }
  ];

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      robot: 'M12 2a2 2 0 0 1 2 2v2H10V4a2 2 0 0 1 2-2zM8 6h8v2a4 4 0 0 1-8 0V6zM4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10zm4 4v4h8v-4H8z',
      users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      award: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 0v6m-3-3h6M8.5 8.5l7 7M15.5 8.5l-7 7'
    };
    return icons[type] || icons['users'];
  }
}
