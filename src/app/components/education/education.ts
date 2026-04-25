import { Component } from '@angular/core';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class EducationComponent {
  items = [
    {
      year: '2023 – Present',
      title: 'BSc (Hons) Electronics & Computer Science',
      place: 'University of Kelaniya',
      dept: 'Department of Physics & Electronics, Faculty of Science',
      detail: ''
    },
    {
      year: '2022 / 2023',
      title: 'G.C.E Advanced Level',
      place: 'J/Arunodaya College',
      dept: 'Physical Science Stream',
      detail: 'Z-Score: 1.4819 · Mathematics A · Chemistry A · Physics C'
    },
    {
      year: '2019',
      title: 'G.C.E Ordinary Level',
      place: 'J/Arunodaya College',
      dept: '',
      detail: 'Results: 5A · 3B · 1C'
    },
    {
      year: 'Completed',
      title: 'Diploma in English',
      place: 'Language Institute',
      dept: '',
      detail: ''
    },
    {
      year: 'Completed',
      title: 'Diploma in Information Technology',
      place: 'IT Institute',
      dept: '',
      detail: ''
    },
  ];
}
