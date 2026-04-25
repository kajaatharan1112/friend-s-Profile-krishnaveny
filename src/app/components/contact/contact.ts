import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  copied = false;
  private readonly email = 'krishnavenysenathirajah@gmail.com';

  copyEmail() {
    if (typeof navigator === 'undefined') return;

    const setCopiedState = () => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2200);
    };

    const fallbackCopy = () => {
      const ta = document.createElement('textarea');
      ta.value = this.email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const success = document.execCommand('copy');
      document.body.removeChild(ta);
      if (success) setCopiedState();
    };

    if (!navigator.clipboard?.writeText) {
      fallbackCopy();
      return;
    }

    navigator.clipboard.writeText(this.email)
      .then(setCopiedState)
      .catch(() => fallbackCopy());
  }

  refs = [
    {
      name: 'Ms. Nadeesha Fernando',
      role: 'Senior Lecturer',
      dept: 'Department of Computer Science, UOM',
      phone: '+94 71 987 6543',
      email: 'nadeesha.fernando@uom.lk'
    },
    {
      name: 'Mr. Chaminda Perera',
      role: 'Senior Manager – Operations',
      dept: 'ABC Holdings Pvt Ltd, Colombo 03',
      phone: '+94 77 123 4567',
      email: 'chaminda.perera@abcholdings.lk'
    }
  ];
}
