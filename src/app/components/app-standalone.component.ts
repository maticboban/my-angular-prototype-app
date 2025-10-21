import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standalone',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Standalone Component</h1>`
})
export class StandaloneComponent { }
